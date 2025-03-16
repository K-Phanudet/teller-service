
import { BalanceTransactionType } from '../common/balance-transaction.js';
import { Expose, Type } from 'class-transformer';
import { IsString, IsNumber, IsEnum, IsOptional, IsDate } from 'class-validator';


export class BalanceTransactionDto {
    @Expose()
    @IsString()
    id!: string;

    @Expose()
    @IsEnum(BalanceTransactionType)
    type!: BalanceTransactionType;

    @Expose()
    @IsNumber()
    amount!: number;

    @Expose()
    @IsString()
    @IsOptional()
    fromAccount?: string | null;

    @Expose()
    @IsString()
    @IsOptional()
    toAccount?: string | null;

    @Expose()
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdAt?: Date;

    @Expose()
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    effectiveAt?: Date;

    @Expose()
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    failedAt?: Date;
}

export class CreateBalanceTransactionDto {
    @Expose()
    @IsEnum(BalanceTransactionType)
    type!: BalanceTransactionType;

    @Expose()
    @IsNumber()
    amount!: number;

    @Expose()
    @IsString()
    @IsOptional()
    fromAccount?: string;

    @Expose()
    @IsString()
    @IsOptional()
    toAccount?: string;

    @Expose()
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    effectiveAt?: Date;
}

export class UpdateBalanceTransactionDto {
    @Expose()
    @IsOptional()
    @IsString()
    type?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    amount?: number;

    @Expose()
    @IsString()
    @IsOptional()
    fromAccount?: string;

    @Expose()
    @IsString()
    @IsOptional()
    toAccount?: string;

    @Expose()
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    effectiveAt?: Date;

    @Expose()
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    failedAt?: Date;
}