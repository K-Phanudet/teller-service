import { EntryStatus, EntryDirection } from "../../common/entry.js";
import { Entry } from "../../domain/entities/entry.entity.js";
import { EntryRepository } from "../../infrastructure/repository/entry-repository.js";
import { Service } from "typedi";

@Service()
export class EntryService {
    constructor(private repository: EntryRepository) { }

    async create(entry: Entry): Promise<Entry> {
        return await this.repository.create(entry)
    }

    async findAllBySourceTransactionId(sourceTransactionId: string): Promise<Entry[]> {
        return await this.repository.findAllBySourceId(sourceTransactionId)
    }
    async findAllByStatus(status: EntryStatus): Promise<Entry[]> {
        return await this.repository.findAllByStatus(status)
    }
    async findAllByDirection(direction: EntryDirection): Promise<Entry[]> {
        return await this.repository.findAllByDirection(direction)
    }

    async fetchDailyEntries(createdAt: Date): Promise<Entry[]> {
        const startDate = new Date(createdAt);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(createdAt);
        endDate.setHours(23, 59, 59, 999);
        return await this.repository.findAllByCreatedAtRange(startDate, endDate)
    }

    async getNetPendingDebit(accountId: string): Promise<number>{
        const pendingDebit = await this.repository.getTotalPendingDebit(accountId)
        const cancelPendingDebit = await this.repository.getTotalCancelPendingDebit(accountId)
        return pendingDebit - cancelPendingDebit
    }

    async getNetPendingCredit(accountId: string): Promise<number>{
        const pendingCredit = await this.repository.getTotalPendingCredit(accountId)
        const cancelPendingCredit = await this.repository.getTotalCancelPendingCredit(accountId)
        return pendingCredit - cancelPendingCredit
    }

    async getPostedCredit(accountId:string): Promise<number>{
        return this.repository.getTotalPostedCredit(accountId)
    }
    async getPostedDebit(accountId:string): Promise<number>{
        return this.repository.getTotalPostedDebit(accountId)
    }
}