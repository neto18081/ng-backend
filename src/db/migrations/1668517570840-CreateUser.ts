import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1668517570840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {name: "id", type:"uuid", isPrimary: true},
                    {name: "username", type:"varchar", isUnique: true},
                    {name: "password", type:"varchar"},
                    {name: "accountId", type: "uuid"}
                ],
                foreignKeys: [
                    {
                        name:"fk_user_account", 
                        columnNames: ["accountId"], 
                        referencedTableName:"account", 
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }

}
