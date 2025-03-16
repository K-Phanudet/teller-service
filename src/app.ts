import 'reflect-metadata';
import 'tsconfig-paths/register.js';
import express from 'express';
import { Container } from 'typedi';
import { AppDataSource } from './data-source.js';
import { UserController } from './controllers/user.controller.js';
import { AuthController } from './controllers/auth.controller.js';
import { TransactionController } from './controllers/transaction.controller.js';
import authenticateJWT from './infrastructure/middleware/authenticateJWT.js';
import { checkPermission } from './infrastructure/middleware/checkPermission.js';
import { BankAccountController } from './controllers/bank-account.js';


async function main() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());

    const userController = Container.get(UserController,);
    const authController = Container.get(AuthController,);
    const transactionController = Container.get(TransactionController,);
    const bankAccountController = Container.get(BankAccountController,);

    app.post('/users', async (req, res) => {
      await userController.createUser(req, res);
    });

    app.post('/auth/login', async (req, res) => {
      await authController.login(req, res);
    });

    app.post('/bank-account',
      authenticateJWT,
      async (req, res) => {
        await bankAccountController.create(req, res)
      })

    app.get('/bank-account/:accountId',
      authenticateJWT,
      async (req, res) => {
        await bankAccountController.fetchAccount(req, res)
      })

    app.post('/deposit',
      authenticateJWT,
      checkPermission('deposit:customer_account'),
      async (req, res) => {
        await transactionController.deposit(req, res)
      })

    app.post('/withdraw',
      authenticateJWT,
      checkPermission('withdraw:customer_account'),
      async (req, res) => {
        await transactionController.withdrawal(req, res)
      })

    app.post('/transfer',
      authenticateJWT,
      checkPermission('transfer:customer_account'),
      async (req, res) => {
        await transactionController.transfer(req, res)
      })

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });

  } catch (err) {
    console.error('Error starting the server:', err);
  }
}

main();
