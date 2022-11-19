import { Request, Response } from "express";
import { GetUserBalanceService } from "../services/GetUserBalanceService";
import jwt from "jsonwebtoken"


export class GetUserBalanceController {

  async handle(request: Request, response: Response) {

    const userService = new GetUserBalanceService();

    const secret = process.env.JWT_SECRET_KEY;
    const { token } = <{token: string}>request.query

    if (!token) return response.status(403).json({
      message: "Token não informado!"
    })

    try {
      const user = <{username: string}>jwt.verify(token, secret)

      const result = await userService.execute({ username: user.username });

      if (result instanceof Error) return response.status(400).json(result);

      return response.json(result);

    } catch(err) {
      return response.status(403).json({
        message: "Token inválido!"
      })
    }
  }
}