import { BankAccountDto, CreateBankAccountDto } from "../../dtos/bank-account.js"
import { BankAccountType } from "../../common/bank-account.js"
import { v4 as uuidv4 } from 'uuid'

export class BankAccount {
    id: string
    name: string
    type: BankAccountType

    constructor(dto: BankAccountDto) {
        this.id = dto.id || uuidv4()
        this.name = dto.name
        this.type = dto.type
    }

    static create(dto: CreateBankAccountDto): BankAccount {
        return new BankAccount({ ...dto, id: uuidv4() })
    }
}