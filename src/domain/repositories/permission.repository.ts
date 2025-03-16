import { Permission } from "../../domain/entities/permission.entity.js";

export interface IPermissionRepository {
    findById(id: string): Promise<Permission | null>;
    findByName(name: string): Promise<Permission | null>;
    findAll(): Promise<Permission[]>;
    create(permission: Permission): Promise<Permission>;
    update(permission: Permission): Promise<Permission>;
    delete(id: string): Promise<void>;
}