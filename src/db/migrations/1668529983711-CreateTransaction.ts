import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTransaction1668529983711 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "transaction",
                columns: [
                    {name:"id", type: "uuid", isPrimary:true},
                    {name: "debitedAccountId", type: "uuid"},
                    {name: "creditedAccountId", type: "uuid"},
                    {name: "value", type: "numeric"},
                    {name: "createdAt", type: "timestamp", default: "now()"}
                ],
                foreignKeys: [
                    {
                        name: "fk_debited_account",
                        columnNames: ["debitedAccountId"],
                        referencedTableName: "user",
                        referencedColumnNames: ["id"]
                    },
                    {
                        name: "fk_credited_account",
                        columnNames: ["creditedAccountId"],
                        referencedTableName: "user",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transaction");
    }

}
