import { Between } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Transaction } from "../entities/Transaction";
import { User } from "../entities/User";

type GetTransactionRequest = {
  username: string;
  date: string;
  filter: string;
}

export class GetTransactionService {

  async execute({username, date, filter}: GetTransactionRequest) {

    /*
      Filters: {
        username: string;
        filter: cash-in | cash-out
        date: MM/DD/YYYY
      }
    */

    
    const transactionRepo = AppDataSource.getRepository(Transaction)
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({where: {username}})

    if (!user) return new Error("Usuário inválido!")

    let where = [
      {creditedAccountId: user.id},
      {debitedAccountId: user.id}
    ]

    if (filter === "cash-in") where.pop()
    if (filter === "cash-out") where.shift();

    if (date) {
        if (!isNaN(Date.parse(date))) {
          const start = new Date(date)
          const end = new Date(start.getTime() + 86400000);
          where.forEach((w, i) => where[i]["createdAt"] = Between(start, end))
        }
    }

    const transactions = await transactionRepo.find({ 
      where: where,
      order: {
        createdAt: "DESC"
      },
      select: {
        creditedAccount: {
          username: true
        },
        debitedAccount: {
          username: true
        },
        createdAt: true,
        value: true
      },
      relations: ["creditedAccount", "debitedAccount"] 
    })

    if (!transactions.length) return new Error("Nenhuma transação encontrada!")

    return transactions;

  }

}