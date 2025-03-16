import { EntryStatus, EntryDirection } from "../../common/entry.js";
import { Entry } from "../../domain/entities/entry.entity.js";
import { IEntryRepository } from "../../domain/repositories/entry.repository.js";
import { EntryEntity } from "../../infrastructure/models/entries.js";
import { AppDataSource } from "../../data-source.js";

import { Between, Repository } from "typeorm";
import { Service } from "typedi";

@Service()
export class EntryRepository implements IEntryRepository {

    private repository: Repository<EntryEntity>;
    
    constructor() {
        this.repository = AppDataSource.getRepository(EntryEntity)
    }

    async findById(id: string): Promise<Entry | null> {
        const entity = await this.repository.findOneBy({ id });
        return entity ? entity.toEntity() : null;
    }

    async findAll(): Promise<Entry[]> {
        const entities = await this.repository.find();
        return entities.map(entity => entity.toEntity());
    }

    async create(entry: Entry): Promise<Entry> {
        const entity = this.repository.create(entry);
        await this.repository.save(entity);
        return entity.toEntity();
    }

    async findAllBySourceId(sourceTransactionId: string): Promise<Entry[]> {
        const entities = await this.repository.findBy({ sourceTransactionId });
        return entities.map(entity => entity.toEntity());
    }

    async findAllByStatus(status: EntryStatus): Promise<Entry[]> {
        const entities = await this.repository.findBy({ status });
        return entities.map(entity => entity.toEntity());
    }

    async findAllByDirection(direction: EntryDirection): Promise<Entry[]> {
        const entities = await this.repository.findBy({ direction });
        return entities.map(entity => entity.toEntity());
    }

    async findAllByCreatedAtRange(startDate: Date, endDate: Date): Promise<Entry[]> {
        const entities = await this.repository.find({
            where: { 
                createdAt: Between(startDate, endDate),
            },
        });
        return entities.map(entity => entity.toEntity());
    }

    async findAllByAccountId(accountId: string): Promise<Entry[]> {
        const entities = await this.repository.findBy({ accountId });
        return entities.map(entity => entity.toEntity());
    }

    async getTotalPendingDebit(accountId: string): Promise<number> {
        const result = await this.repository
            .createQueryBuilder("entry")
            .select("COALESCE(SUM(entry.amount), 0)", "total")
            .where("entry.accountId = :accountId", { accountId })
            .andWhere("entry.direction = :direction", { direction: EntryDirection.DEBIT })
            .andWhere("entry.status = :status", { status: EntryStatus.PENDING })
            .getRawOne();

        return result.total !== null ? Number(result.total) : 0;
    }

    async getTotalCancelPendingDebit(accountId: string): Promise<number> {
        const result = await this.repository
            .createQueryBuilder("entry")
            .select("COALESCE(SUM(entry.amount), 0)", "total")
            .where("entry.accountId = :accountId", { accountId })
            .andWhere("entry.direction = :direction", { direction: EntryDirection.DEBIT })
            .andWhere("entry.status = :status", { status: EntryStatus.CANCEL_PENDING })
            .getRawOne();

        return result.total !== null ? Number(result.total) : 0;
    }

    async getTotalPendingCredit(accountId: string): Promise<number> {
        const result = await this.repository
            .createQueryBuilder("entry")
            .select("COALESCE(SUM(entry.amount), 0)", "total")
            .where("entry.accountId = :accountId", { accountId })
            .andWhere("entry.direction = :direction", { direction: EntryDirection.CREDIT })
            .andWhere("entry.status = :status", { status: EntryStatus.PENDING })
            .getRawOne();

        return result.total !== null ? Number(result.total) : 0;
    }

    async getTotalCancelPendingCredit(accountId: string): Promise<number> {
        const result = await this.repository
            .createQueryBuilder("entry")
            .select("COALESCE(SUM(entry.amount), 0)", "total")
            .where("entry.accountId = :accountId", { accountId })
            .andWhere("entry.direction = :direction", { direction: EntryDirection.CREDIT })
            .andWhere("entry.status = :status", { status: EntryStatus.CANCEL_PENDING })
            .getRawOne();

        return result.total !== null ? Number(result.total) : 0;
    }

    async getTotalPostedDebit(accountId: string): Promise<number> {
        const result = await this.repository
            .createQueryBuilder("entry")
            .select("COALESCE(SUM(entry.amount), 0)", "total")
            .where("entry.accountId = :accountId", { accountId })
            .andWhere("entry.direction = :direction", { direction: EntryDirection.DEBIT })
            .andWhere("entry.status = :status", { status: EntryStatus.POSTED })
            .getRawOne();

        return result.total !== null ? Number(result.total) : 0;
    }

    async getTotalPostedCredit(accountId: string): Promise<number> {
        const result = await this.repository
            .createQueryBuilder("entry")
            .select("COALESCE(SUM(entry.amount), 0)", "total")
            .where("entry.accountId = :accountId", { accountId })
            .andWhere("entry.direction = :direction", { direction: EntryDirection.CREDIT })
            .andWhere("entry.status = :status", { status: EntryStatus.POSTED })
            .getRawOne();

        return result.total !== null ? Number(result.total) : 0;
    }
}