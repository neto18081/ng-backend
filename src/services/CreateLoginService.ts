import { AppDataSource } from "../../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

type LoginRequest = {
  username: string;
  password: string;
}

type LoginResponse = {
  username: string;
  token: string;
}

export class CreateLoginService {

  async execute({username, password}:LoginRequest): Promise<LoginResponse | Error> {
    const repo = AppDataSource.getRepository(User);
    
    
    const user = await repo.findOne({where: {
      username
    }})

    if (!user) return new Error("Usuário não cadastrado!");

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (passwordMatch) {

      const secret = process.env.JWT_SECRET_KEY;
      
      const token = jwt.sign({
        username, password}, secret, 
        {expiresIn: "24h"
      })

      return {username, token}
    } else return new Error("Usuário ou senha incorretos!")
  }
}