
import { Service } from "typedi";
import { Role } from "../../domain/entities/role.entity.js";
import { IRoleRepository } from "../../domain/repositories/role.repository.js";
import { RoleEntity } from "../../infrastructure/models/roles.js";
import { AppDataSource } from "../../data-source.js";
import { Repository } from "typeorm";
import { RoleWithPermissionsDto } from "../../dtos/role.dto.js";

@Service()
export class RoleRepository implements IRoleRepository {
    private repository: Repository<RoleEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(RoleEntity)
    }

    async findById(id: string): Promise<Role | null> {
        const entity = await this.repository.findOneBy({ id });
        return entity ? entity.toEntity() : null;
    }

    async findByName(name: string): Promise<Role | null> {
        const entity = await this.repository.findOneBy({ name });
        return entity ? entity.toEntity() : null;
    }

    async findAll(): Promise<Role[]> {
        const entities = await this.repository.find();
        return entities.map(entity => entity.toEntity());
    }

    async create(role: Role): Promise<Role> {
        const entity = this.repository.create(role);
        await this.repository.save(entity);
        return entity.toEntity();
    }

    async update(role: Role): Promise<Role> {
        return await this.repository.save(role);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async getRoleWithPermissions(roleId: string): Promise<RoleWithPermissionsDto> {
        try {
            const roleEntity = await this.repository.findOne({
                where: { id: roleId },
                relations: ['permissions'],
            });

            if (!roleEntity) {
                return RoleWithPermissionsDto.fromEntities(null, [])
            }

            const permissions = roleEntity.permissions.map(permissionEntity => permissionEntity.toEntity());

            return RoleWithPermissionsDto.fromEntities(roleEntity.toEntity(), permissions)
        } catch (error) {
            console.error('Error fetching role with permissions:', error);
            return RoleWithPermissionsDto.fromEntities(null, [])
        }
    }
}