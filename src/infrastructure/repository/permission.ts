import { PermissionsEntity } from "../../infrastructure/models/permissions.js";
import { Permission } from "../../domain/entities/permission.entity.js";
import { IPermissionRepository } from "../../domain/repositories/permission.repository.js";

import { AppDataSource } from "../../data-source.js";
import { Repository } from "typeorm";
import { Service } from "typedi";

@Service()
export class PermissionRepository implements IPermissionRepository {
    private repository: Repository<PermissionsEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(PermissionsEntity)
    }

    async findById(id: string): Promise<Permission | null> {
        const entity = await this.repository.findOneBy({ id });
        return entity ? entity.toEntity() : null;
    }

    async findByName(name: string): Promise<Permission | null> {
        const entity = await this.repository.findOneBy({ name });
        return entity ? entity.toEntity() : null;
    }

    async findAll(): Promise<Permission[]> {
        const entities = await this.repository.find();
        return entities.map(entity => entity.toEntity());
    }

    async create(permission: Permission): Promise<Permission> {
        const entity = this.repository.create(permission);
        await this.repository.save(entity);
        return entity.toEntity();
    }

    async update(permission: Permission): Promise<Permission> {
        await this.repository.save(permission);
        return permission;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}