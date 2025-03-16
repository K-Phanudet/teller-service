
import { EntryStatus, EntryDirection } from '../common/entry.js';

import { Expose, Type } from 'class-transformer';
import { IsString, IsNumber, IsEnum, IsOptional, IsDate } from 'class-validator';

export class EntryDto {
    @Expose()
    @IsString()
    id!: string;

    @Expose()
    @IsEnum(EntryDirection)
    direction!: EntryDirection;

    @Expose()
    @IsNumber()
    amount!: number;

    @Expose()
    @IsString()
    sourceTransactionId!: string;

    @Expose()
    @IsEnum(EntryStatus)
    status!: EntryStatus;

    @Expose()
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdAt?: Date;

    @Expose()
    @IsString()
    accountId!: string;
}



export class CreateEntryDto {
    @Expose()
    @IsEnum(EntryDirection)
    direction!: EntryDirection;

    @Expose()
    @IsNumber()
    amount!: number;

    @Expose()
    @IsString()
    sourceTransactionId!: string;

    @Expose()
    @IsEnum(EntryStatus)
    status!: EntryStatus;

    @Expose()
    @IsString()
    accountId!: string;
}