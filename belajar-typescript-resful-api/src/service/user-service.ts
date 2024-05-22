import { prismaClient } from "../application/database";
import ResponseError from "../error/response-error";
import { CreateUserRequest, UserResponse, toUserResponse } from "../model/user-model";
import UserValidation from "../validation/user-validation";
import Validation from "../validation/validation";
import bcrypt from "bcrypt";

class UserServices {
  static async register(req: CreateUserRequest): Promise<UserResponse> {
    const registerReq = Validation.validate(UserValidation.REGISTER, req);

    const totalUserWithSameUsername = await prismaClient.user.count({
        where: {
            username: registerReq.username
        }
    })

    if (totalUserWithSameUsername != 0) {
        throw new ResponseError(400, "Username already exists")
    }

    registerReq.password = await bcrypt.hash(registerReq.password, 10);

    const user = await prismaClient.user.create({
        data: registerReq
    })

    return toUserResponse(user);
  }
}

export default UserServices;
