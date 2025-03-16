import { UserRepository } from "../../infrastructure/repository/user.repository.js";
import { User } from "../entities/user.entity.js";
import { Service } from "typedi";

import { UsernameAlreadyExistsError } from "../../core/error/username-already-exists.error.js";
import { InvalidCredentialsError } from "../../core/error/invalid-credentials.error.js";

@Service()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async createUser(user: User): Promise<User> {
        return this.userRepository.createUser(user);
    }

    async getUserByUsername(username: string): Promise<User | null> {
        return this.userRepository.findUserByUsername(username);
    }

    async authenticateUser(username: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findUserByUsername(username);

        if (!user) {
            return null;
        }

        if (await this.userRepository.comparePassword(user, password)) {
            return user;
        }

        throw new InvalidCredentialsError();
    }
}