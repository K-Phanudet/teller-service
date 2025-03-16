import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from "./users.js";
import { PermissionsEntity } from "./permissions.js";
import { Role } from "../../domain/entities/role.entity.js";


@Entity("roles")
export class RoleEntity {
    @PrimaryColumn()
    id: string = uuidv4()

    @Column({ unique: true })
    name!: string

    @OneToMany(() => UserEntity, (user) => user.role)
    users!: UserEntity[]

    @ManyToMany(() => PermissionsEntity, (permission) => permission.roles)
    @JoinTable()
    permissions!: PermissionsEntity[];

    static fromEntity(role: Role): RoleEntity {
        const roleEntity = new RoleEntity();
        roleEntity.id = role.id ?? uuidv4()
        roleEntity.name = role.name;

        return roleEntity;
    }

    toEntity(): Role {
        return new Role({
            id: this.id.toString(),
            name: this.name,
        });
    }
}