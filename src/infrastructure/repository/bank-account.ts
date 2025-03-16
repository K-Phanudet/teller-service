import { IBankAccountRepository } from '../../domain/repositories/bank-account.repository.js';
import { AppDataSource } from '../../data-source.js';
import { BankAccountEntity } from '../../infrastructure/models/bank-accounts.js';
import { BankAccount } from '../../domain/entities/bank-account.entity.js';
import { BankAccountType } from '../../common/bank-account.js';
import { Repository } from 'typeorm';
import { Service } from 'typedi';

@Service()
export class BankAccountRepository implements IBankAccountRepository {

    private repository: Repository<BankAccountEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(BankAccountEntity)
    }

    async findById(id: string): Promise<BankAccount | null> {
        const bankAccountEntity = await this.repository.findOneBy({ id });
        if (!bankAccountEntity) {
            return null;
        }
        return bankAccountEntity.toEntity();
    }

    async findByName(name: string): Promise<BankAccount | null> {
        const bankAccountEntity = await this.repository.findOneBy({ name });
        if (!bankAccountEntity) {
            return null;
        }
        return bankAccountEntity.toEntity();
    }

    async findByType(type: BankAccountType): Promise<BankAccount[]> {
        const bankAccountEntities = await this.repository.findBy({ type });
        return bankAccountEntities.map(entity => entity.toEntity());
    }

    async findAll(): Promise<BankAccount[]> {
        const bankAccountEntities = await this.repository.find();
        return bankAccountEntities.map(entity => entity.toEntity());
    }

    async create(bankAccount: BankAccount): Promise<BankAccount> {
        const bankAccountEntity = this.repository.create(bankAccount);
        await this.repository.save(bankAccountEntity);
        return bankAccountEntity.toEntity();
    }

    async update(bankAccount: BankAccount): Promise<BankAccount> {
        await this.repository.save(bankAccount);
        return bankAccount;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}