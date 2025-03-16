import { ResourceNotFoundError } from "../core/error/resource-not-found.error.js"
import { BalanceTransactionService } from "../domain/services/balance-transaction.service.js"
import { BankAccountService } from "../domain/services/bank-account.js"
import { EntryService } from "../domain/services/entry.service.js"
import { Service } from "typedi"
import { BalanceTransactionType } from "../common/balance-transaction.js"
import { BalanceTransaction } from "../domain/entities/balance-transaction.entity.js"
import { Entry } from "../domain/entities/entry.entity.js"
import { EntryDirection, EntryStatus } from "../common/entry.js"
import { GetAvalableBalanceUseCase } from "./get-available-balance.js"
import { InsufficientBalanceError } from "../core/error/insufficient-balance.error.js"

@Service()
export class TransferFundsUseCase {
    private bankAccountService: BankAccountService
    private balanceTransactionService: BalanceTransactionService
    private entryService: EntryService
    private getAvalableBalanceUseCase: GetAvalableBalanceUseCase

    constructor(
        bankAccountService: BankAccountService,
        balanceTransactionService: BalanceTransactionService,
        entryService: EntryService,
        getAvalableBalanceUseCase: GetAvalableBalanceUseCase
    ) {
        this.bankAccountService = bankAccountService
        this.balanceTransactionService = balanceTransactionService
        this.entryService = entryService
        this.getAvalableBalanceUseCase = getAvalableBalanceUseCase
    }

    async execute(sourceAccountId: string, destinationAccountId: string, amount: number): Promise<void> {
        const sourceAccount = await this.bankAccountService.findById(sourceAccountId)
        if (!sourceAccount) {
            throw new ResourceNotFoundError()
        }

        const destinationAccount = await this.bankAccountService.findById(destinationAccountId)
        if (!destinationAccount) {
            throw new ResourceNotFoundError()
        }

        // checking availableBalance
        const availableBalance = await this.getAvalableBalanceUseCase.execute(sourceAccount.id)
        if (amount > availableBalance) {
            throw new InsufficientBalanceError('Insufficient funds to transfer', {
                account: sourceAccount.id,
            })
        }

        //create transfer balance txn pending with source account
        const transaction = await this.balanceTransactionService.create(BalanceTransaction.create({
            type: BalanceTransactionType.TRANSFER,
            amount: Math.abs(amount),
            fromAccount: sourceAccount.id,
            toAccount: destinationAccount.id
        }))


        // Create pending credit entry for source account
        await this.entryService.create(Entry.create({
            direction: EntryDirection.CREDIT,
            status: EntryStatus.PENDING,
            amount: Math.abs(transaction.amount),
            sourceTransactionId: transaction.id,
            accountId: sourceAccount.id
        }))

        // Create pending debit entry for destination account
        await this.entryService.create(Entry.create({
            direction: EntryDirection.DEBIT,
            status: EntryStatus.PENDING,
            amount: Math.abs(transaction.amount),
            sourceTransactionId: transaction.id,
            accountId: destinationAccount.id
        }))

        // Mark txn succeed
        transaction.succeed(new Date())
        this.balanceTransactionService.update(transaction)

        // Create cancel_pending credit entry for source account
        await this.entryService.create(Entry.create({
            direction: EntryDirection.CREDIT,
            status: EntryStatus.CANCEL_PENDING,
            amount: Math.abs(transaction.amount),
            sourceTransactionId: transaction.id,
            accountId: sourceAccount.id
        }))

        // Create cancel_pending debit entry for destination account
        await this.entryService.create(Entry.create({
            direction: EntryDirection.DEBIT,
            status: EntryStatus.CANCEL_PENDING,
            amount: Math.abs(transaction.amount),
            sourceTransactionId: transaction.id,
            accountId: destinationAccount.id
        }))

        // Create posted credit entry for source account
        await this.entryService.create(Entry.create({
            direction: EntryDirection.CREDIT,
            status: EntryStatus.POSTED,
            amount: Math.abs(transaction.amount),
            sourceTransactionId: transaction.id,
            accountId: sourceAccount.id
        }))

        // Create posted debit entry for destination account
        await this.entryService.create(Entry.create({
            direction: EntryDirection.DEBIT,
            status: EntryStatus.POSTED,
            amount: Math.abs(transaction.amount),
            sourceTransactionId: transaction.id,
            accountId: destinationAccount.id
        }))
    }
}