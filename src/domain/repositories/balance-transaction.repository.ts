import { BalanceTransactionType } from "../../common/balance-transaction.js";
import { BalanceTransaction } from "../entities/balance-transaction.entity.js"; 

export interface IBalanceTransactionRepository {
    findAllBySourceAccountId(sourceAccountId: string): Promise<BalanceTransaction[]>;
    findAllByDestinationAccountId(destinationAccountId: string): Promise<BalanceTransaction[]>;
    findById(id: string): Promise<BalanceTransaction | null>;
    findAllByType(type: BalanceTransactionType): Promise<BalanceTransaction[]>;
    findAll(): Promise<BalanceTransaction[]>;
    create(balanceTransaction: BalanceTransaction): Promise<BalanceTransaction>;
    update(balanceTransaction: BalanceTransaction): Promise<BalanceTransaction>;
    delete(id: string): Promise<void>;
    findAllByAccountId(accountId: string): Promise<BalanceTransaction[]>;
}