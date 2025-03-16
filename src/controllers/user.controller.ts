import { UsernameAlreadyExistsError } from '../core/error/username-already-exists.error.js';
import { CreateUserUseCase } from '../usecase/create-user.usecase.js';
import { Request, Response } from 'express';
import { CreateUserDto } from "../dtos/user.dto.js"

import { Service } from 'typedi';
import { plainToInstance } from 'class-transformer';

@Service()
export class UserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(userUseCase: CreateUserUseCase) {
    this.createUserUseCase = userUseCase;
  }

  async createUser(req: Request, res: Response) {
    const { username, password, name, role } = req.body;

    try {
      const user = await this.createUserUseCase.execute(name, username, password, role);
     
      const responseDto = plainToInstance(CreateUserDto, user);
     
      return res.status(201).json(responseDto);
    } catch (error) {
      if (error instanceof UsernameAlreadyExistsError) {
        res.status(400).send({ message: error.message });
      }
      else if (error instanceof Error) {
        return res.status(500).send({ message: error.message })
      } else {

        return res.status(500).json({ message: 'Failed to create user' });
      }
    }
  }
}
