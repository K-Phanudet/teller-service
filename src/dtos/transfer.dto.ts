import { Expose } from "class-transformer";
import { IsInt, IsPositive, IsString } from "class-validator";

export class TransferInputDto {
    @IsString()
    @Expose({ name: 'from_account_id' }) 
    fromAccountId!: string;

    @IsString()
    @Expose({ name: 'to_account_id' }) 
    toAccountId!: string;

    @IsInt()
    @IsPositive()
    amount!: number;
}