import { User } from "../entities/user.entity.js";

export interface IUserRepository {
    createUser(user: User): Promise<User>;
    findUserByUsername(username: string): Promise<User | null>;
    findUserById(id: string): Promise<User | null>;
    comparePassword(user: User, password: string): Promise<boolean>
}