import { NextFunction, Request, Response } from "express";
import { CreateUserRequest } from "../model/user-model";
import UserServices from "../service/user-service";

class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body;
      const response = await UserServices.register(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
