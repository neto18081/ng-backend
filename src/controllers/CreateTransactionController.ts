import { Request, Response } from "express";
import { CreateTransactionService } from "../services/CreateTransactionService";
import jwt from "jsonwebtoken"


export class CreateTransactionController {

  async handle(request: Request, response: Response) {

    const { creditedUsername, value } = request.body;
    const { token } = <{token: string}>request.query;

    const secret = process.env.JWT_SECRET_KEY;

    if (!token) return response.status(403).json({
      message: "Token não informado!"
    })

    try {

      if (!creditedUsername || !value) {
        return response.status(400).json({
          message: "Preencha todos os campos"
        })
      }

      const user = <{username: string}>jwt.verify(token, secret)
      const transactionService = new CreateTransactionService();

      const result = await transactionService.execute({ 
        debitedUsername: user.username,
        creditedUsername,
        value
      });
      

      if (result instanceof Error) return response.status(404).json({
        message: result.message
      });

      return response.json(result);

    }catch (err) {
      return response.status(403).json({
        message: "Token inválido!"
      })
    }
  }
}