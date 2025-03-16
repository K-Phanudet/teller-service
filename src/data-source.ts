import { DataSource } from 'typeorm';
import 'dotenv/config';
import { UserEntity } from './infrastructure/models/users.js';
import { BankAccountEntity } from './infrastructure/models/bank-accounts.js';
import { BalanceTransactionEntity } from './infrastructure/models/balance-transactions.js';
import { EntryEntity } from './infrastructure/models/entries.js';
import { PermissionsEntity } from './infrastructure/models/permissions.js';
import { RoleEntity } from './infrastructure/models/roles.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mydb',
  synchronize: process.env.NODE_ENV !== "production",
  logging: true,
  entities: [
    UserEntity, 
    BalanceTransactionEntity, 
    BankAccountEntity, 
    EntryEntity, 
    PermissionsEntity,
    RoleEntity],
  migrationsRun: false,
  migrations: ["src/migrations/*.js","dist/migrations/*.js"],
});