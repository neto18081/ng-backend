import { AppDataSource } from "../../data-source";
import { Account } from "../entities/Account";
import { Transaction } from "../entities/Transaction";
import { User } from "../entities/User";

type TransactionRequest = {
  debitedUsername: string;
  creditedUsername: string;
  value: number;
}

type TransactionResponse = {
  debitedAccountId: string;
  creditedAccountId: string;
  value: number;
}

export class CreateTransactionService {

  async execute({ debitedUsername, creditedUsername, value }: TransactionRequest): Promise<TransactionResponse | Error> {

    if (!debitedUsername || !creditedUsername || !value) return new Error("Parâmetros inválidos!")

    const accountRepo = AppDataSource.getRepository(Account);
    const userRepo = AppDataSource.getRepository(User);
    const transactionRepo = AppDataSource.getRepository(Transaction);

    const debitedUser = await userRepo.findOne({where: {
      username: debitedUsername
    }})
    const creditedUser = await userRepo.findOne({where: {
      username: creditedUsername
    }})

    if (!creditedUser) return new Error("Esse usuário não existe!")

    const debitedAccount = await accountRepo.findOne({where: {
      id: debitedUser.accountId
    }})
    const creditedAccount = await accountRepo.findOne({where: {
      id: creditedUser.accountId
    }})

    if (debitedUser.accountId === creditedUser.accountId) {
      return new Error("Você não pode realizar uma transferência para si mesmo!");
    }

    if (debitedAccount.balance < value) {
      return new Error("Saldo insuficiente!");
    }

    const debitedAccountBalance = parseFloat(debitedAccount.balance.toString()) - value;
    const creditedAccountBalance = parseFloat(creditedAccount.balance.toString()) + value;

    accountRepo.update(debitedAccount, {balance: debitedAccountBalance})
    accountRepo.update(creditedAccount, {balance: creditedAccountBalance})

    const transaction = transactionRepo.create({
      creditedAccountId: creditedUser.id,
      debitedAccountId: debitedUser.id,
      value
    })

    await transactionRepo.save(transaction)

    return transaction;
  }
}