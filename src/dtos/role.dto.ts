
import { Permission } from '../domain/entities/permission.entity.js';
import { Role } from '../domain/entities/role.entity.js';
import { Expose, Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';


export class RoleDto {
    @Expose()
    @IsOptional()
    @IsString()
    id?: string;

    @Expose()
    @IsString()
    name!: string
}

export class CreateRoleDto {
    @Expose()
    @IsString()
    name!: string
}


export class RoleWithPermissionsDto {
    @Type(() => Role)
    role?: Role | null;

    @Type(() => Permission)
    permissions!: Permission[];

    constructor(role: Role | null, permissions: Permission[]) {
        this.role = role;
        this.permissions = permissions;
    }

    static fromEntities(role: Role | null, permissions: Permission[]): RoleWithPermissionsDto {
        return new RoleWithPermissionsDto(role, permissions);
    }

    @Transform(({ value }) => value.map((permission: Permission) => permission.name))
    getPermissionNames(): string[] {
        return this.permissions.map(permission => permission.name);
    }

}