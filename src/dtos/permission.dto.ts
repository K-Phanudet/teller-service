import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';


export class PermissionDto {
    @Expose()
    @IsString()
    id!: string;

    @Expose()
    @IsString()
    name!: string
}

export class CreatePermissionDto {
    @Expose()
    @IsString()
    name!: string
}