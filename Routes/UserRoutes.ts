import express, { NextFunction, Request, Response } from "express";
import UserLogic from "../Logic/UserLogic";
import { User } from "../Models/User";

const userRouter = express.Router();

// POST -> localhost:8080/user/addUser
userRouter.post(
  "/register",
  async (request: Request, response: Response, next: NextFunction) => {
    const newUser: User = request.body;
    const result = await UserLogic.register(newUser);
    response.status(201).json(result);
  }
);


userRouter.post(
  "/login",
  async (request: Request, response: Response, next: NextFunction) => {
    const user: User = request.body;
    const result = await UserLogic.checkUser(user.email, user.password);
      console.log(`user from front is: ${JSON.stringify(user)}`)
      console.log(`result from back is: ${result}`);
      console.log(JSON.stringify(result));
      if (result) {
            response.status(200).json(result);
      } else {
          response.status(404).json({message: "User not found"});
      }
  }
);

userRouter.get(
  "/checkEmail",
  async (request: Request, response: Response, next: NextFunction) => {
    const email = request.body;
    const result = await UserLogic.checkEmail(email);
    response.status(200).json(result);
  }
);

export default userRouter;
