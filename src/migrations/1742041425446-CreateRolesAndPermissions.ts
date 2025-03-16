import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidv4 } from "uuid"

export class CreateRolesAndPermissions1742041425446 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            INSERT INTO roles (id, name) 
            SELECT '${uuidv4()}', 'ADMIN'
            WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'ADMIN')
        `);

        await queryRunner.query(`
            INSERT INTO roles (id, name) 
            SELECT '${uuidv4()}', 'TELLER'
            WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'TELLER')
        `);

        await queryRunner.query(`
            INSERT INTO roles (id, name) 
            SELECT '${uuidv4()}', 'VIEWER'
            WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'VIEWER')
        `);

        const adminPermissions = [
            "withdraw:customer_account",
            "transfer:customer_account",
            "view:customer_account_balance",
            "deposit:customer_account",
            "approve:transaction",
        ];

        const tellerPermissions = [
            "withdraw:customer_account",
            "transfer:customer_account",
            "view:customer_account_balance",
            "deposit:customer_account",
        ];

        for (const permissionName of adminPermissions) {
            await queryRunner.query(`
            INSERT INTO permissions (id, name) 
            SELECT '${uuidv4()}', '${permissionName}'
            WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE name = '${permissionName}')
        `);
        }
        for (const permissionName of tellerPermissions) {
            await queryRunner.query(`
            INSERT INTO permissions (id, name) 
            SELECT '${uuidv4()}', '${permissionName}'
            WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE name = '${permissionName}')
        `);
        }

        const adminRoleId = await queryRunner.query(`SELECT id FROM roles WHERE name = 'ADMIN'`);
        const tellerRoleId = await queryRunner.query(`SELECT id FROM roles WHERE name = 'TELLER'`);

        for (const permissionName of adminPermissions) {
            const permissionId = await queryRunner.query(`SELECT id FROM permissions WHERE name = '${permissionName}'`);
            await queryRunner.query(`INSERT INTO roles_permissions_permissions ("rolesId", "permissionsId") VALUES ('${adminRoleId[0].id}', '${permissionId[0].id}')`);
        }

        for (const permissionName of tellerPermissions) {
            const permissionId = await queryRunner.query(`SELECT id FROM permissions WHERE name = '${permissionName}'`);
            await queryRunner.query(`INSERT INTO roles_permissions_permissions ("rolesId", "permissionsId") VALUES ('${tellerRoleId[0].id}', '${permissionId[0].id}')`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM roles_permissions_permissions`);
        await queryRunner.query(`DELETE FROM permissions`);
        await queryRunner.query(`DELETE FROM roles`);
    }
}
