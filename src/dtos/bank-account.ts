import { BankAccountType } from "../common/bank-account.js";
import { Expose } from "class-transformer";
import { IsOptional, IsString, IsEnum } from "class-validator";

export class BankAccountDto {
    @Expose()
    @IsOptional()
    @IsString()
    id?: string

    @Expose()
    @IsString()
    name!: string

    @IsEnum(BankAccountType)
    type!: BankAccountType
}

export class CreateBankAccountDto {
    @Expose()
    @IsString()
    name!: string

    @IsEnum(BankAccountType)
    type!: BankAccountType
}

export class CreateBankAccountResDto {
    @Expose()
    @IsString()
    id!: string

    @Expose()
    @IsString()
    name!: string

    @IsEnum(BankAccountType)
    type!: BankAccountType
}