import { EntryService } from "../domain/services/entry.service.js";
import { BalanceTransactionType } from "../common/balance-transaction.js";
import { BalanceTransaction } from "../domain/entities/balance-transaction.entity.js";
import { BalanceTransactionService } from "../domain/services/balance-transaction.service.js";
import { BankAccountService } from "../domain/services/bank-account.js";
import { Service } from "typedi";
import { Entry } from "../domain/entities/entry.entity.js";
import { EntryStatus, EntryDirection } from "../common/entry.js";
import { ResourceNotFoundError } from "../core/error/resource-not-found.error.js";

@Service()
export class DepositUseCase {

    private bankAccountService: BankAccountService
    private balanceTransactionService: BalanceTransactionService
    private entryService: EntryService

    constructor(
        bankAccountService: BankAccountService,
        balanceTransactionService: BalanceTransactionService,
        entryService: EntryService,
    ){
        this.bankAccountService = bankAccountService
        this.balanceTransactionService = balanceTransactionService
        this.entryService = entryService
    }

    async execute(accountId: string, amount: number): Promise<void>{
        const account = await this.bankAccountService.findById(accountId)
        if(!account){
            throw new ResourceNotFoundError()
        }

        // Create balance pending txn
        const transaction = await this.balanceTransactionService.create(BalanceTransaction.create({
            type: BalanceTransactionType.DEPOSIT,
            amount: amount,
            toAccount: accountId,
        }))

        
        // Create pending entry
        await this.entryService.create(Entry.create({
            direction: EntryDirection.DEBIT,
            status: EntryStatus.PENDING,
            amount: Math.abs(transaction.amount),
            sourceTransactionId: transaction.id,
            accountId: accountId
        }))

        // Mark balance succeed
        transaction.succeed(new Date())
        await this.balanceTransactionService.update(transaction)
        
        // Create cancel_pending entry
        await this.entryService.create(Entry.create({
            direction: EntryDirection.DEBIT,
            status: EntryStatus.CANCEL_PENDING,
            amount: Math.abs(transaction.amount),
            sourceTransactionId: transaction.id,
            accountId: accountId,
        }))

        // Create posted entry
        await this.entryService.create(Entry.create({
            direction: EntryDirection.DEBIT,
            status: EntryStatus.POSTED,
            amount: Math.abs(transaction.amount),
            sourceTransactionId: transaction.id,
            accountId: accountId,
        }))

    }
}