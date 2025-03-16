import { Service } from "typedi"
import { BankAccountService } from "../domain/services/bank-account.js"
import { BankAccount } from "@domain/entities/bank-account.entity.js"

@Service()
export class FetchBankAccountInfo {
    private bankAccountService: BankAccountService


    constructor(
        bankAccountService: BankAccountService,
    ) {
        this.bankAccountService = bankAccountService
    }

    async execute(bankAccountId: string): Promise<BankAccount | null> {
        return this.bankAccountService.findById(bankAccountId)
    }
}