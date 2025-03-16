import { UserService } from "../domain/services/user.service.js";
import { InvalidCredentialsError } from "../core/error/invalid-credentials.error.js";
import jwt from 'jsonwebtoken';
import { Service } from "typedi";
import { DecodedToken } from "../common/jwt.js";
import { RoleService } from "../domain/services/role.service.js";
import { config } from "../infrastructure/config/config.js"
import { InternalServerErrorException } from "@nestjs/common";

@Service()
export class LoginUseCase  {
    private userService: UserService
    private roleService: RoleService


    constructor(
        userService: UserService,
        roleService: RoleService,

    ){
        this.userService = userService
        this.roleService = roleService

    }

    async execute(username: string, password: string): Promise<{ accessToken: string}> {
        const user = await this.userService.authenticateUser(username, password);

        if(user === null){
            throw new InvalidCredentialsError();
        }

        if(!user.role.id){
            throw new InternalServerErrorException()
        }
        
        const roleWithPermissions = await this.roleService.getRoleWithPermissions(user.role.id)

        console.log("DEBUG", roleWithPermissions, user.role.name)
        const payload : DecodedToken = {
            id: user.id,
            role: user.role.name,
            permissions: roleWithPermissions.getPermissionNames()
        }

        const accessToken = jwt.sign(
            payload,
            config.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { accessToken };
    }
}