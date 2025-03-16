import { BalanceTransactionType } from "../../common/balance-transaction.js";
import { BalanceTransactionDto, CreateBalanceTransactionDto } from "../../dtos/balance-transaction.dto.js";
import { v4 as uuidv4 } from 'uuid';

export class BalanceTransaction {
    id: string;
    type: BalanceTransactionType;
    amount: number;
    fromAccount?: string | null;
    toAccount?: string | null;
    createdAt: Date;
    effectiveAt?: Date;
    failedAt?: Date;

    constructor(dto: BalanceTransactionDto) {
        this.id = dto.id;
        this.type = dto.type;
        this.amount = dto.amount;
        this.fromAccount = dto.fromAccount;
        this.toAccount = dto.toAccount;
        this.createdAt = dto.createdAt || new Date();
        this.effectiveAt = dto.effectiveAt;
        this.failedAt = dto.failedAt
    }

    static create(dto: CreateBalanceTransactionDto): BalanceTransaction {
        return new BalanceTransaction({ ...dto, id: uuidv4(), createdAt: new Date() })
    }

    succeed(effectiveAt: Date){
        this.effectiveAt = effectiveAt
    }

    failed(failedAt: Date){
        this.failedAt = failedAt
    }
}