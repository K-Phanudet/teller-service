import { IsOptional, IsString } from 'class-validator';
import { Expose, Exclude, Type } from 'class-transformer';
// import { Role } from '../domain/entities/role.entity.js';
import { RoleDto } from './role.dto.js';

export class UserDto {
    @Expose()
    @IsOptional()
    @IsString()
    id!: string;

    @Expose()
    @IsString()
    name!: string;

    @Expose()
    @IsString()
    username!: string;

    @Exclude()
    @IsString()
    password!: string;

    @Expose()
    @IsString()
    @Type(() => RoleDto)
    role!: RoleDto;
}

export class CreateUserDto {
    @Expose()
    @IsString()
    name!: string;

    @Expose()
    @IsString()
    username!: string;

    @Exclude()
    @IsString()
    password!: string;

    @Expose()
    @Type(() => RoleDto)
    role!: RoleDto;
}
