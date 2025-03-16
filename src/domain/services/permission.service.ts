import { Permission } from "../../domain/entities/permission.entity.js";
import { PermissionRepository } from "../../infrastructure/repository/permission.js";
import { Service } from "typedi";

@Service()
export class PermissionService {
    constructor(private repository: PermissionRepository){}

    async findAll(): Promise<Permission[]> {
        return this.repository.findAll();
    }
}