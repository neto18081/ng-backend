import { AppDataSource } from "../../data-source";
import { User } from "../entities/User";
import { CreateAccountService } from "./CreateAccountService";
import bcrypt from "bcrypt"

type UserRequest = {
  username: string;
  password: string;
}

export class CreateUserService {

  async execute({ username, password }: UserRequest): Promise<UserRequest | {message: string}> {

    const userRepo = AppDataSource.getRepository(User);

    if (await userRepo.findOne({ where: {
      username
    } })) {
      return new Error("Usuário já existente!")
    }

    if (username.length < 3) {
      return new Error("Usuário deve ter pelo menos 3 caracteres.")
    }

    if (password.length < 8) {
      return new Error("Senha deve ter pelo menos 8 caracteres.")
    }
    if (password.search(/[a-z]/) < 0) {
      return new Error("A senha deve conter pelo menos 1 letra minúscula.")
    }
    if (password.search(/[A-Z]/) < 0) {
      return new Error("A senha deve conter pelo menos 1 letra maiúscula.")
    }
    if (password.search(/[0-9]/) < 0) {
      return new Error("A senha deve conter pelo menos 1 número.")
    }

    const hashedPassword = await bcrypt.hash(password, 10) 

    const accountService = new CreateAccountService();
    const { id } = await accountService.execute();

    const user = userRepo.create({
      username: username,
      password: hashedPassword,
      accountId: id,
    })
    
    await userRepo.save(user);
    return user;

  }
}