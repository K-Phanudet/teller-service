import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { EntryStatus, EntryDirection } from '../../common/entry.js';
// import { BalanceTransactionEntity } from './index.js';
import { Entry } from '../../domain/entities/entry.entity.js';

@Entity("entries")
export class EntryEntity {
    @PrimaryColumn()
    id: string = uuidv4();

    @Column({
        type: 'enum',
        enum: EntryDirection,
    })
    direction!: EntryDirection;

    @Column()
    amount!: number;

    @Column()
    sourceTransactionId!: string;

    @Column()
    accountId!: string;

    @Column({
        type: 'enum',
        enum: EntryStatus,
    })
    status!: EntryStatus;

    @Column({ type: 'timestamp' })
    createdAt: Date = new Date();


    // @ManyToOne(() => BalanceTransactionEntity)
    // // @ManyToOne(() => BalanceTransactionEntity)
    // @JoinColumn({ name: 'sourceTransactionId' })
    // balanceTransaction?: BalanceTransactionEntity;

    static fromEntity(entry: Entry): EntryEntity {
        const entryEntity = new EntryEntity();
        entryEntity.id = entry.id ?? uuidv4()
        entryEntity.direction = entry.direction;
        entryEntity.amount = entry.amount;
        entryEntity.sourceTransactionId = entry.sourceTransactionId;
        entryEntity.status = entry.status;
        entryEntity.createdAt = new Date(entry.createdAt);
        entryEntity.accountId = entry.accountId

        return entryEntity;
    }

    toEntity(): Entry {
        return new Entry({
            id: this.id.toString(),
            direction: this.direction,
            amount: this.amount,
            sourceTransactionId: this.sourceTransactionId,
            status: this.status,
            createdAt: new Date(this.createdAt),
            accountId: this.accountId
        });
    }
}