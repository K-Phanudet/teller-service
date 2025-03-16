import { EntryStatus, EntryDirection } from "../../common/entry.js";
import { Entry } from "../../domain/entities/entry.entity.js";


export interface IEntryRepository {
    findById(id: string): Promise<Entry | null>;
    findAll(): Promise<Entry[]>;
    create(entry: Entry): Promise<Entry>;
    findAllBySourceId(sourceTransactionId: string): Promise<Entry[]>;
    findAllByStatus(status: EntryStatus): Promise<Entry[]>;
    findAllByDirection(direction: EntryDirection): Promise<Entry[]>;
    findAllByCreatedAtRange(startDate: Date, endDate: Date): Promise<Entry[]>;
    findAllByAccountId(accountId: string): Promise<Entry[]>;
    // Query amounts
    getTotalPendingDebit(accountId: string): Promise<number>;
    getTotalCancelPendingDebit(accountId: string): Promise<number>;
    getTotalPendingCredit(accountId: string): Promise<number>;
    getTotalCancelPendingCredit(accountId: string): Promise<number>;
    getTotalPostedDebit(accountId: string): Promise<number>;
    getTotalPostedCredit(accountId: string): Promise<number>;
}