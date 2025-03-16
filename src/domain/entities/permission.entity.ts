import { CreatePermissionDto, PermissionDto } from "../../dtos/permission.dto.js"
import { v4 as uuidv4 } from 'uuid';

export class Permission {
    id: string
    name!: string

    constructor(dto: PermissionDto) {
        this.id = dto.id
        this.name = dto.name
    }

    static create(dto: CreatePermissionDto): Permission {
        return new Permission({ ...dto, id: uuidv4() })
    }
}