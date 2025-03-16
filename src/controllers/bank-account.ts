import { CreateBankAccountUseCase } from "../usecase/create-bank-account.js";
import { Service } from "typedi";
import { Response, Request } from "express";
import { plainToInstance } from "class-transformer";
import { CreateBankAccountResDto } from "../dtos/bank-account.js";

@Service()
export class BankAccountController {
    private createBankAccountUseCase: CreateBankAccountUseCase

    constructor(
        createBankAccountUseCase: CreateBankAccountUseCase
    ) {
        this.createBankAccountUseCase = createBankAccountUseCase
    }

    async create(req: Request, res: Response){
        const { name, type } = req.body
        try {
            const account = this.createBankAccountUseCase.execute(name, type)
            const responseDto = plainToInstance(CreateBankAccountResDto, account);
            
            return res.status(201).json(responseDto);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).send({ message: error.message })
            } else {
                return res.status(500).json({ message: 'Failed to create user' });
            }
        }

    }
}