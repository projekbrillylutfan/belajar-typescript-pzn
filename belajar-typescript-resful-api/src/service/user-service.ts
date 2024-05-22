import { validate } from "uuid";
import { prismaClient } from "../application/database";
import ResponseError from "../error/response-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  UserResponse,
  toUserResponse,
} from "../model/user-model";
import UserValidation from "../validation/user-validation";
import Validation from "../validation/validation";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

class UserServices {
  static async register(req: CreateUserRequest): Promise<UserResponse> {
    const registerReq = Validation.validate(UserValidation.REGISTER, req);

    const totalUserWithSameUsername = await prismaClient.user.count({
      where: {
        username: registerReq.username,
      },
    });

    if (totalUserWithSameUsername != 0) {
      throw new ResponseError(400, "Username already exists");
    }

    registerReq.password = await bcrypt.hash(registerReq.password, 10);

    const user = await prismaClient.user.create({
      data: registerReq,
    });

    return toUserResponse(user);
  }

  static async login(req: LoginUserRequest): Promise<UserResponse> {
      const loginReq = Validation.validate(UserValidation.LOGIN, req)

      let user = await prismaClient.user.findUnique({
          where: {
              username: loginReq.username
          }
      })

      if(!user) {
        throw new ResponseError(401, "Username is incorrect")
      }

      const isPasswordValid = await bcrypt.compare(loginReq.password, user.password)

      if (!isPasswordValid) {
        throw new ResponseError(401, "password is incorrect")
      }

      user = await prismaClient.user.update({
          where: {
            username: loginReq.username
          },
          data: {
            token: uuid()
          }
      })

      const response = toUserResponse(user)
      response.token = user.token!
      return response
  }
}

export default UserServices;
