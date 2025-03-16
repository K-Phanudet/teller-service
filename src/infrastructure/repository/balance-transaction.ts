
import { BalanceTransaction } from '../../domain/entities/balance-transaction.entity.js';
import { IBalanceTransactionRepository } from '../../domain/repositories/balance-transaction.repository.js';
import { BalanceTransactionEntity } from '../../infrastructure/models/index.js';
import { AppDataSource } from '../../data-source.js';
import { BalanceTransactionType } from '../../common/balance-transaction.js';
import { Repository } from 'typeorm';
import { Service } from 'typedi';

@Service()
export class BalanceTransactionRepository implements IBalanceTransactionRepository {
    private repository: Repository<BalanceTransactionEntity>;
    
    constructor() {
        this.repository = AppDataSource.getRepository(BalanceTransactionEntity)
    }
    
    async findAllBySourceAccountId(sourceAccountId: string): Promise<BalanceTransaction[]> {
        const entities = await this.repository.findBy({ fromAccount: sourceAccountId });
        return entities.map(entity => entity.toEntity());
    }

    async findAllByDestinationAccountId(destinationAccountId: string): Promise<BalanceTransaction[]> {
        const entities = await this.repository.findBy({ toAccount: destinationAccountId });
        return entities.map(entity => entity.toEntity());
    }

    async findById(id: string): Promise<BalanceTransaction | null> {
        const entity = await this.repository.findOneBy({ id });
        return entity ? entity.toEntity() : null;
    }

    async findAllByType(type: BalanceTransactionType): Promise<BalanceTransaction[]> {
        const entities = await this.repository.findBy({ type });
        return entities.map(entity => entity.toEntity());
    }

    async findAll(): Promise<BalanceTransaction[]> {
        const entities = await this.repository.find();
        return entities.map(entity => entity.toEntity());
    }

    async create(balanceTransaction: BalanceTransaction): Promise<BalanceTransaction> {
        const entity = this.repository.create(balanceTransaction);
        await this.repository.save(entity);
        return entity.toEntity();
    }

    async update(balanceTransaction: BalanceTransaction): Promise<BalanceTransaction> {
        await this.repository.save(balanceTransaction);
        return balanceTransaction;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findAllByAccountId(accountId: string): Promise<BalanceTransaction[]> {
        const entities = await this.repository.find({
            where: [
                { fromAccount: accountId },
                { toAccount: accountId },
            ],
        });
        return entities.map(entity => entity.toEntity());
    }
}