import { Expose } from "class-transformer";
import { IsInt, IsPositive, IsString } from "class-validator";

export class DepositInputDto {
    @IsString()
    @Expose({ name: 'account_id' }) 
    accountId!: string;

    @IsInt()
    @IsPositive()
    amount!: number;
}