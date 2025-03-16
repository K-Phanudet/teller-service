import { Role } from "../../domain/entities/role.entity.js";
import { RoleRepository } from "../../infrastructure/repository/roles.js";
import { Service } from "typedi";
import { RoleWithPermissionsDto } from "../../dtos/role.dto.js";

@Service()
export class RoleService {
    constructor(private repository: RoleRepository){}

    async findByName(name: string): Promise<Role | null> {
        return this.repository.findByName(name);
    }

    async getRoleWithPermissions(roleId: string): Promise<RoleWithPermissionsDto>{
        return this.repository.getRoleWithPermissions(roleId)
    }
}