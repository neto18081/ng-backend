import { AppDataSource } from "../../data-source";
import { User } from "../entities/User";

type UserBalanceResponse = {
  balance: number;
}
type UserBalanceRequest = {
  username: string
}


export class GetUserBalanceService {

  async execute({username}:UserBalanceRequest):Promise<UserBalanceResponse> {

    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({where: {
      username
    },
    select: {
      username: false,
      password: false,
      accountId: false,
      account: {
        id: false,
        balance: true
      }
    },
    relations: ["account"]
  })

    return {
      balance: user.account.balance
    }

  }

}