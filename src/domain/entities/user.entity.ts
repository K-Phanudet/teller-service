
import { CreateUserDto, UserDto } from '../../dtos/user.dto.js';
import { v4 as uuidv4 } from 'uuid';
import { Role } from './role.entity.js';


export class User {
    id: string
    name: string
    username: string
    password: string
    role: Role;

    constructor(dto: UserDto) {
        this.id = dto.id
        this.name = dto.name
        this.username = dto.username
        this.password = dto.password
        this.role = dto.role
    }

    static create(dto: CreateUserDto): User {
        return new User({ ...dto, id: uuidv4() });
    }
}