import { LoginResponseDto } from '../dtos/auth.dto.js';
import { InvalidCredentialsError } from '../core/error/invalid-credentials.error.js';
import { LoginUseCase } from '../usecase/login.usecase.js';
import { Request, Response } from 'express';


import { Service } from 'typedi';
import { plainToInstance } from 'class-transformer';

@Service()
export class AuthController {
  private loginUseCase: LoginUseCase;

  constructor(loginUseCase: LoginUseCase) {
    this.loginUseCase = loginUseCase;
  }


  async login(req: Request, res: Response): Promise<void> { 
    const { username, password } = req.body;

    try {
        const result = await this.loginUseCase.execute(username, password);

        const responseDto = plainToInstance(LoginResponseDto, result);
        
        res.cookie('access_token', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', 
            maxAge: 60 * 60 * 1000, 
        });

        res.status(200).json(responseDto);
    } catch (error) {
        console.log("DEBUG",error)
        if (error instanceof InvalidCredentialsError) {
            res.status(401).json({ message: error.message }); 
        } else if (error instanceof Error) {
            console.error("Login error:", error);
            res.status(500).json({ message: error.message }); 
        } else {
            console.error("Unknown login error:", error);
            res.status(500).json({ message: 'Server error' }); 
        }
    }
}

 
}
