import { Request, Response } from "express";
import { CreateLoginService } from "../services/CreateLoginService";


export class CreateLoginController {

  async handle(request: Request, response: Response) {

    const { username, password } = request.body;

    if (!username || !password) {
      return response.status(400).json({
        message: "Preencha todos os campos"
      })
    }

    const loginService = new CreateLoginService();
    
    const result = await loginService.execute({ username, password })

    if (result instanceof Error) {
      return response.status(404).json({
        message: result.message
      })
    }

    return response.json(result)
  }

}