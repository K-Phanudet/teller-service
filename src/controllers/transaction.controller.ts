import { DepositInputDto } from "../dtos/deposit.dto.js";
import { DepositUseCase } from "../usecase/deposit.usecase.js";
import { TransferFundsUseCase } from "../usecase/transfer-funds.usecase.js";
import { WithdrawalUseCase } from "../usecase/withdraw.usecase.js";
import { plainToClass } from "class-transformer";
import { Service } from "typedi";
import { validate } from "class-validator";
import { Response , Request } from "express";
import { WithdrawalInputDto } from "../dtos/withdrawal.dto.js";
import { TransferInputDto } from "../dtos/transfer.dto.js";
import { InsufficientBalanceError } from "../core/error/insufficient-balance.error.js";

@Service()
export class TransactionController {
    private transferFundsUseCase: TransferFundsUseCase
    private withdrawalUseCase: WithdrawalUseCase
    private depositUseCase: DepositUseCase

    constructor(
        transferFundsUseCase: TransferFundsUseCase,
        withdrawalUseCase: WithdrawalUseCase,
        depositUseCase: DepositUseCase
    ) {
        this.transferFundsUseCase = transferFundsUseCase
        this.withdrawalUseCase = withdrawalUseCase
        this.depositUseCase = depositUseCase
    }

    async deposit(req: Request, res: Response) {
        const inputDto = plainToClass(DepositInputDto, req.body);

        const errors = await validate(inputDto);

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors.map(error => ({
                    property: error.property,
                    constraints: error.constraints,
                })),
            });
        }

        try {
            await this.depositUseCase.execute(inputDto.accountId, inputDto.amount);

            res.status(200).json({
                message: 'Deposit successful',
                accountId: inputDto.accountId,
                amount: inputDto.amount,
            });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).send({ message: error.message })
            } else {
                res.status(500).json({
                    message: 'Internal server error',
                });
            }

        }
    }

    async withdrawal(req: Request, res: Response){
        const inputDto = plainToClass(WithdrawalInputDto, req.body);

        const errors = await validate(inputDto);

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors.map(error => ({
                    property: error.property,
                    constraints: error.constraints,
                })),
            });
        }

        try {
            await this.withdrawalUseCase.execute(inputDto.accountId, inputDto.amount);

            res.status(200).json({
                message: 'Withdraw successful',
                accountId: inputDto.accountId,
                amount: inputDto.amount,
            });
        } catch (error) {
            if(error instanceof InsufficientBalanceError){
                return res.status(403).send({ message: error.message })
            }else if (error instanceof Error) {
                return res.status(500).send({ message: error.message })
            } else {
                res.status(500).json({
                    message: 'Internal server error',
                });
            }

        }
    }

    async transfer(req: Request, res: Response){
        const inputDto = plainToClass(TransferInputDto, req.body);

        const errors = await validate(inputDto);

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors.map(error => ({
                    property: error.property,
                    constraints: error.constraints,
                })),
            });
        }

        try {
            await this.transferFundsUseCase.execute(inputDto.fromAccountId, inputDto.toAccountId, inputDto.amount);

            res.status(200).json({
                message: 'Transfer successful',
                fromAccount: inputDto.fromAccountId,
                toAccount: inputDto.toAccountId,
            });
        } catch (error) {
            if(error instanceof InsufficientBalanceError){
                return res.status(403).send({ message: error.message })
            }else if (error instanceof Error) {
                return res.status(500).send({ message: error.message })
            } else {
                res.status(500).json({
                    message: 'Internal server error',
                });
            }

        }

    }
}