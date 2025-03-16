import { BankAccountType } from "../../common/bank-account.js";
import { BankAccount } from "../../domain/entities/bank-account.entity.js";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid'

@Entity("bankAccounts")
export class BankAccountEntity {
    @PrimaryColumn()
    id: string = uuidv4()

    @Column()
    name!: string

    @Column({
        type: 'enum',
        enum: BankAccountType,
    })
    type!: BankAccountType;


    static fromEntity(bankAccount: BankAccount): BankAccountEntity {
        const bankAccountEntity = new BankAccountEntity();
        bankAccountEntity.id = bankAccount.id ?? uuidv4()
        bankAccountEntity.name = bankAccount.name;
        bankAccountEntity.type = bankAccount.type

        return bankAccountEntity;
    }

    toEntity(): BankAccount {
        return new BankAccount({
            id: this.id.toString(),
            name: this.name,
            type: this.type
        });
    }
}