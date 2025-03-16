import { ResourceNotFoundError } from "../core/error/resource-not-found.error.js"
import { BalanceTransactionService } from "../domain/services/balance-transaction.service.js"
import { BankAccountService } from "../domain/services/bank-account.js"
import { EntryService } from "../domain/services/entry.service.js"
import { Service } from "typedi"
import { BalanceTransaction } from "../domain/entities/balance-transaction.entity.js"
import { BalanceTransactionType } from "../common/balance-transaction.js"
import { Entry } from "../domain/entities/entry.entity.js"
import { EntryStatus, EntryDirection } from "../common/entry.js"
import { GetAvalableBalanceUseCase } from "./get-available-balance.js"
import { InsufficientBalanceError } from "../core/error/insufficient-balance.error.js"

@Service()
export class WithdrawalUseCase {
    private bankAccountService: BankAccountService
    private balanceTransactionService: BalanceTransactionService
    private entryService: EntryService
    private getAvalableBalanceUseCase: GetAvalableBalanceUseCase


    constructor(
        bankAccountService: BankAccountService,
        balanceTransactionService: BalanceTransactionService,
        getAvalableBalanceUseCase: GetAvalableBalanceUseCase,
        entryService: EntryService,
    ) {
        this.bankAccountService = bankAccountService
        this.balanceTransactionService = balanceTransactionService
        this.entryService = entryService
        this.getAvalableBalanceUseCase = getAvalableBalanceUseCase
    }

    async execute(bankAccountId: string, amount: number): Promise<void> {
        const account = await this.bankAccountService.findById(bankAccountId)
        if (!account) {
            throw new ResourceNotFoundError()
        }

        // checking availableBalance
        const availableBalance = await this.getAvalableBalanceUseCase.execute(account.id)
        if (amount > availableBalance) {
            throw new InsufficientBalanceError('Insufficient funds', {
                account: account.id,
            })
        }

        // Create withdrawal balance txn pending 
        const transaction = await this.balanceTransactionService.create(BalanceTransaction.create({
            type: BalanceTransactionType.WITHDRAWAL,
            amount: Math.abs(amount),
            fromAccount: account.id,
        }))

        // Create pending entry
        await this.entryService.create(Entry.create({
            direction: EntryDirection.CREDIT,
            status: EntryStatus.PENDING,
            amount: Math.abs(transaction.amount),
            sourceTransactionId: transaction.id,
            accountId: account.id
        }))

        // Mark balance succeed
        transaction.succeed(new Date())
        await this.balanceTransactionService.update(transaction)

        // Create cancel_pending entry
        await this.entryService.create(Entry.create({
            direction: EntryDirection.CREDIT,
            status: EntryStatus.CANCEL_PENDING,
            amount: Math.abs(transaction.amount),
            sourceTransactionId: transaction.id,
            accountId: account.id
        }))

        // Create posted entry
        await this.entryService.create(Entry.create({
            direction: EntryDirection.CREDIT,
            status: EntryStatus.POSTED,
            amount: Math.abs(transaction.amount),
            sourceTransactionId: transaction.id,
            accountId: account.id
        }))

    }
}