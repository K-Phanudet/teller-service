import { Service } from "typedi";
import { BalanceTransactionRepository } from "../../infrastructure/repository/balance-transaction.js";
import { BalanceTransaction } from "../../domain/entities/balance-transaction.entity.js";
import { BalanceTransactionType } from "../../common/balance-transaction.js";

@Service()
export class BalanceTransactionService {
    constructor(private repository: BalanceTransactionRepository){}

    async findAllBySourceAccountId(sourceAccountId: string): Promise<BalanceTransaction[]> {
        return this.repository.findAllBySourceAccountId(sourceAccountId)
    }

    async findAllByDestinationAccountId(sourceAccountId: string): Promise<BalanceTransaction[]> {
        return this.repository.findAllByDestinationAccountId(sourceAccountId)
    }

    async findById(id: string): Promise<BalanceTransaction | null> {
        return this.repository.findById(id)
    }

    async findAllByType(type: BalanceTransactionType): Promise<BalanceTransaction[]> {
        return this.repository.findAllByType(type)
    }

    async create(balanceTransaction: BalanceTransaction): Promise<BalanceTransaction> {
        return this.repository.create(balanceTransaction);
    }

    async update(balanceTransaction: BalanceTransaction): Promise<BalanceTransaction> {
        return this.repository.update(balanceTransaction);
    }

    async findAllByAccountId(accountId: string): Promise<BalanceTransaction[]> {
        return this.repository.findAllByAccountId(accountId)
    }
}