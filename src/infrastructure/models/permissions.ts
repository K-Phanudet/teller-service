import { Entity, PrimaryColumn, Column, ManyToMany } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { RoleEntity } from "./roles.js";
import { Permission } from "../../domain/entities/permission.entity.js";


@Entity("permissions")
export class PermissionsEntity {
    @PrimaryColumn()
    id: string = uuidv4();

    @Column({ unique: true })
    name!: string;

    @ManyToMany(() => RoleEntity, (role) => role.permissions)
    roles!: RoleEntity[];

    static fromEntity(role: Permission): PermissionsEntity {
        const permissionEntity = new PermissionsEntity();
        permissionEntity.id = role.id ?? uuidv4()
        permissionEntity.name = role.name;

        return permissionEntity;
    }

    toEntity(): Permission {
        return new Permission({
            id: this.id.toString(),
            name: this.name,
        });
    }
}