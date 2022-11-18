import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "ng-cash",
  synchronize: true,
  logging: true,
  entities: ["./src/entities/*.ts"],
  subscribers: [],
  migrations: ["./src/db/migrations/*.ts"],
})