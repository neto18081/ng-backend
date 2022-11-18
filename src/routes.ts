import { Router } from "express";
import { CreateTransactionController } from "./controllers/CreateTransactionController";
import { CreateUserController } from "./controllers/CreateUserController";

import jwt from "jsonwebtoken"
import { CreateLoginController } from "./controllers/CreateLoginController";
import { GetTransactionController } from "./controllers/GetTransactionController";
import { GetUserBalanceController } from "./controllers/GetUserBalanceController";



const routes = Router();

routes.post("/user", new CreateUserController().handle);

routes.post("/transaction", new CreateTransactionController().handle)

routes.post("/login", new CreateLoginController().handle);

routes.get("/transactions", new GetTransactionController().handle);

routes.get("/balance", new GetUserBalanceController().handle)

const secret = process.env.JWT_SECRET_KEY;

routes.post("/jwt/verify", (req, res) => {
  const { token } = req.body;

  try {
    const verify = jwt.verify(token, secret);
    return res.json({
      verify
    })
  } catch(err) {
      return res.status(404).json({
        message: "Token inválido!"
      })
  }
})

export { routes }