import { CreateBankAccountUseCase } from "../usecase/create-bank-account.js";
import { Service } from "typedi";
import { Response, Request } from "express";
import { plainToInstance } from "class-transformer";
import { CreateBankAccountResDto } from "../dtos/bank-account.js";
import { GetBalanceUseCase } from "../usecase/get-balance.js";
import { GetAvalableBalanceUseCase } from "../usecase/get-available-balance.js";
import { FetchBankAccountInfo } from "../usecase/fetch-bank-account-info.js";

@Service()
export class BankAccountController {
    private createBankAccountUseCase: CreateBankAccountUseCase
    private getAvalableBalanceUseCase: GetAvalableBalanceUseCase
    private getBalanceUseCase: GetBalanceUseCase
    private fetchBankAccountInfo: FetchBankAccountInfo

    constructor(
        createBankAccountUseCase: CreateBankAccountUseCase,
        getBalanceUseCase: GetBalanceUseCase,
        getAvalableBalanceUseCase: GetAvalableBalanceUseCase,
        fetchBankAccountInfo: FetchBankAccountInfo
    ) {
        this.createBankAccountUseCase = createBankAccountUseCase
        this.getAvalableBalanceUseCase = getAvalableBalanceUseCase
        this.getBalanceUseCase = getBalanceUseCase
        this.fetchBankAccountInfo = fetchBankAccountInfo
    }

    async create(req: Request, res: Response){
        const { name, type } = req.body
        try {
            const account = await this.createBankAccountUseCase.execute(name, type)
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

    async fetchAccount(req: Request, res: Response){
        try {
            const { accountId } = req.params;

            const account = await this.fetchBankAccountInfo.execute(accountId)
            if(account === null){
                res.status(400)
            }
            const avialableBalance = await this.getAvalableBalanceUseCase.execute(accountId)
            const balance = await this.getBalanceUseCase.execute(accountId)
            
            return res.status(201).json({
                account,
                balances: {
                    avialableBalance,
                    balance
                }
            });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).send({ message: error.message })
            } else {
                return res.status(500).json({ message: 'Failed to create user' });
            }
        }
    }
}