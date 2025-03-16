import { CreateRoleDto, RoleDto } from "../../dtos/role.dto.js"
import { v4 as uuidv4 } from 'uuid';

export class Role {
    id?: string
    name!: string

    constructor(dto:RoleDto){
        this.id = dto.id
        this.name = dto.name
    }

    static create(dto: CreateRoleDto):Role {
        return new Role({...dto, id: uuidv4()})
    }
}