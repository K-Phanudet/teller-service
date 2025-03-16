import { BalanceTransactionType } from "../../common/balance-transaction.js";
import { BalanceTransaction } from "../../domain/entities/balance-transaction.entity.js";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { EntryEntity } from "./index.js";

@Entity("balanceTransactions")
export class BalanceTransactionEntity {
    @PrimaryColumn()
    id: string = uuidv4();

    @Column({
        type: 'enum',
        enum: BalanceTransactionType,
    })
    type!: BalanceTransactionType;

    @Column()
    amount!: number;

    @Column({ type: "varchar", nullable: true })
    fromAccount?: string | null;

    @Column({ type: "varchar", nullable: true })
    toAccount?: string | null;

    @Column({ type: 'timestamp' })
    createdAt: Date = new Date();

    @Column({ type: 'timestamp', nullable: true })
    effectiveAt?: Date;

    @Column({ type: 'timestamp', nullable: true })
    failedAt?: Date;

    // @OneToMany(() => EntryEntity, (entry) => entry.balanceTransaction)
    // entries!: EntryEntity[];

    static fromEntity(balanceTransaction: BalanceTransaction): BalanceTransactionEntity {
        const entity = new BalanceTransactionEntity();
        entity.id = balanceTransaction.id ?? uuidv4();
        entity.type = balanceTransaction.type;
        entity.amount = balanceTransaction.amount;
        entity.fromAccount = balanceTransaction.fromAccount;
        entity.toAccount = balanceTransaction.toAccount;
        entity.createdAt = new Date(balanceTransaction.createdAt);
        entity.effectiveAt = balanceTransaction.effectiveAt ? new Date(balanceTransaction.effectiveAt) : undefined;
        entity.failedAt = balanceTransaction.failedAt ? new Date(balanceTransaction.failedAt) : undefined;

        return entity;
    }

    toEntity(): BalanceTransaction {
        return new BalanceTransaction({
            id: this.id,
            type: this.type,
            amount: this.amount,
            fromAccount: this.fromAccount,
            toAccount: this.toAccount,
            createdAt: new Date(this.createdAt),
            effectiveAt: this.effectiveAt ? new Date(this.effectiveAt) : undefined,
            failedAt: this.failedAt ? new Date(this.failedAt) : undefined,
        });
    }
}