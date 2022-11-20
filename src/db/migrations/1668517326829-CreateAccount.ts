import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAccount1668517326829 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "account",
                columns: [
                    {name: "id", type: "uuid", isPrimary: true},
                    {name: "balance", type: "numeric", default: 100.00},
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("account");
    }

}
