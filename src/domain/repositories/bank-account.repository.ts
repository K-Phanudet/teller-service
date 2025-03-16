import { BankAccountType } from "../../common/bank-account.js";
import { BankAccount } from "../entities/bank-account.entity.js"

export interface IBankAccountRepository {
    findById(id: string): Promise<BankAccount | null>;
    findByName(name: string): Promise<BankAccount | null>;
    findByType(type: BankAccountType): Promise<BankAccount[]>;
}