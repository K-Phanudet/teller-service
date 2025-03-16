import { BankAccountService } from "../domain/services/bank-account.js";
import { EntryService } from "../domain/services/entry.service.js";
import { ResourceNotFoundError } from "../core/error/resource-not-found.error.js";
import { Service } from "typedi";

@Service()
export class GetBalanceUseCase {
    private bankAccountService: BankAccountService
    private entryService: EntryService

    constructor(
        bankAccountService: BankAccountService,
        entryService: EntryService,
    ){
        this.bankAccountService = bankAccountService
        this.entryService = entryService
    }

    async execute(bankAccountId: string): Promise<number>{
        const account = await this.bankAccountService.findById(bankAccountId)
        if(!account){
            throw new ResourceNotFoundError()
        }

        const postedCredit = await this.entryService.getPostedCredit(account.id)
        const postedDedit =  await this.entryService.getPostedDebit(account.id)
        return postedDedit - postedCredit
    }
}