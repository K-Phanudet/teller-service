import { CreateEntryDto, EntryDto } from '../../dtos/entry.dto.js';
import { EntryStatus, EntryDirection } from '../../common/entry.js';
import { v4 as uuidv4 } from 'uuid';

export class Entry {
    id: string
    direction: EntryDirection
    amount: number
    sourceTransactionId: string
    status: EntryStatus
    createdAt: Date
    accountId: string


    constructor({ id, direction, amount, sourceTransactionId, status, createdAt, accountId }: EntryDto) {
        this.id = id,
        this.direction = direction,
        this.amount = amount,
        this.sourceTransactionId = sourceTransactionId
        this.status = status
        this.createdAt = createdAt || new Date();
        this.accountId = accountId
    }

    static create(dto: CreateEntryDto): Entry {
        return new Entry({ ...dto, id: uuidv4(), createdAt: new Date() })
    }
}
