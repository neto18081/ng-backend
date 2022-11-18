import { Request, Response } from "express";
import { GetTransactionService } from "../services/GetTransactionService";
import jwt from "jsonwebtoken"

type Query = {
  date: string;
  filter: string;
  token: string
}

export class GetTransactionController {

  async handle(request: Request, response: Response) {

    const secret = process.env.JWT_SECRET_KEY;
    const { date, filter, token } = <Query>request.query

    if (!token) return response.status(403).json({
      message: "Token não informado!"
    })

    try {
      const user = <{username: string}>jwt.verify(token, secret)

      const transactionService = new GetTransactionService();

      const result = await transactionService.execute({username: user.username, date, filter});

      if (result instanceof Error) return response.status(400).json({
        message: result.message
      })

      return response.json(result)

    } catch(err) {
        return response.status(404).json({
          message: "Token inválido!"
        })
    }
  }

}