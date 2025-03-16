import { BankAccount } from "../../domain/entities/bank-account.entity.js";
import { BankAccountRepository } from "../../infrastructure/repository/bank-account.js";
import { Service } from "typedi";

@Service()
export class BankAccountService {
    constructor(private repository: BankAccountRepository){}

    async findById(id:string) :Promise<BankAccount | null> {
        return this.repository.findById(id)
    }
   
    async findAll(): Promise<BankAccount[]> {
        return await this.repository.findAll();
    }

    async create(bankAccount: BankAccount): Promise<BankAccount> {
        return this.repository.create(bankAccount)
    }

    async update(bankAccount: BankAccount): Promise<BankAccount> {
        return await this.repository.update(bankAccount);
    }
}