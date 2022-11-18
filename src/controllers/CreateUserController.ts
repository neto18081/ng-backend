import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";


export class CreateUserController {

  async handle(request: Request, response: Response) {
    
    const { username, password } = request.body;
    if (!username || !password) {
      return response.status(400).json({
        message: "Preencha todos os campos"
      })
    }

    const userService = new CreateUserService();

    const result = await userService.execute({ username, password })

    if (result instanceof Error) return response.status(400).json({
      message: result.message
    })
    return response.json(result)
  }

}