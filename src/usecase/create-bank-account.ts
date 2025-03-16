import { BankAccount } from "../domain/entities/bank-account.entity.js";
import { BankAccountService } from "../domain/services/bank-account.js";
import { Service } from "typedi";
import { BankAccountType } from "@common/bank-account.js";

@Service()
export class CreateBankAccountUseCase {
    private bankAccountService: BankAccountService;

    constructor(bankAccountService: BankAccountService) {
        this.bankAccountService = bankAccountService;
    }

    async execute(name: string, type: BankAccountType): Promise<BankAccount> {
        return this.bankAccountService.create(BankAccount.create({ name, type }));
    }

}