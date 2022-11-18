import { AppDataSource } from "../../data-source";
import { Account } from "../entities/Account";

export class CreateAccountService {

  async execute() {
    const repo = AppDataSource.getRepository(Account);
    const account = repo.create();
    await repo.save(account)
    return account;
  }

}