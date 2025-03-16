import { IUserRepository } from '../../domain/repositories/user.repository.js';
import { UserEntity } from '../models/users.js';
import { User } from '../../domain/entities/user.entity.js';

import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { AppDataSource } from '../../data-source.js';


@Service()
export class UserRepository implements IUserRepository {
    private userRepository: Repository<UserEntity>;


    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntity)
    }


    async createUser(user: User): Promise<User> {
        const userEntity = UserEntity.fromEntity(user);
        const savedUserEntity = await this.userRepository.save(userEntity);
        return savedUserEntity.toEntity();
    }


    async findUserByUsername(username: string): Promise<User | null> {
        const userEntity = await this.userRepository.findOne({ where: { username }, relations: ['role'] });
        if (!userEntity) {
            return null;
        }
        return userEntity.toEntity();
    }


    async findUserById(id: string): Promise<User | null> {
        const userEntity = await this.userRepository.findOne({ where: { id }, relations: ['role'] });
        if (!userEntity) {
            return null;
        }
        return userEntity.toEntity();
    }

    async comparePassword(user: User, password: string): Promise<boolean> {
        const userEntity = await this.userRepository.findOne({ where: { username: user.username } });
        if (userEntity) {
            return userEntity.comparePassword(password);
        }
        return false;
    }
}
