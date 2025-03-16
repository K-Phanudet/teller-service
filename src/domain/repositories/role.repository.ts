import { RoleWithPermissionsDto } from "../../dtos/role.dto.js";
import { Role } from "../../domain/entities/role.entity.js";


export interface IRoleRepository {
    findById(id: string): Promise<Role | null>;
    findByName(name: string): Promise<Role | null>;
    findAll(): Promise<Role[]>;
    create(role: Role): Promise<Role>;
    update(role: Role): Promise<Role>;
    delete(id: string): Promise<void>;
    getRoleWithPermissions(roleId: string): Promise<RoleWithPermissionsDto>
}