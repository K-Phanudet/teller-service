import { Expose } from "class-transformer";
import { IsInt, IsPositive, IsString } from "class-validator";

export class WithdrawalInputDto {
    @IsString()
    @Expose({ name: 'account_id' }) 
    accountId!: string;

    @IsInt()
    @IsPositive()
    amount!: number;
}