import { RoleService } from "../domain/services/role.service.js";
import { UserService } from "../domain/services/user.service.js";
import { Service } from "typedi";
import { User } from "../domain/entities/user.entity.js";
import { UsernameAlreadyExistsError } from "../core/error/username-already-exists.error.js";

@Service()
export class CreateUserUseCase {
    private userService: UserService;
    private roleService: RoleService

    constructor(
        userService: UserService,
        roleService: RoleService
    ) {
        this.userService = userService;
        this.roleService = roleService
    }

    async execute(name: string, username: string, password: string, roleName: string) {
        const role = await this.roleService.findByName(roleName)
        if(!role){
            throw new Error()
        }

        const existingUser = await this.userService.getUserByUsername(username);
        
        if (existingUser) {
            throw new UsernameAlreadyExistsError();
        }

        const user  = User.create({name,username,password,role})
        return this.userService.createUser(user);
    }

}