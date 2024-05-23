var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prismaClient } from "../application/database.js";
import ResponseError from "../error/response-error.js";
import { toUserResponse, } from "../model/user-model.js";
import UserValidation from "../validation/user-validation.js";
import Validation from "../validation/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
class UserServices {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = Validation.validate(UserValidation.REGISTER, request);
            const totalUserWithSameUsername = yield prismaClient.user.count({
                where: {
                    username: registerRequest.username,
                },
            });
            if (totalUserWithSameUsername != 0) {
                throw new ResponseError(400, "Username already exists");
            }
            registerRequest.password = yield bcrypt.hash(registerRequest.password, 10);
            const user = yield prismaClient.user.create({
                data: registerRequest,
            });
            return toUserResponse(user);
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginRequest = Validation.validate(UserValidation.LOGIN, request);
            let user = yield prismaClient.user.findUnique({
                where: {
                    username: loginRequest.username,
                },
            });
            if (!user) {
                throw new ResponseError(401, "Username or password is wrong");
            }
            const isPasswordValid = yield bcrypt.compare(loginRequest.password, user.password);
            if (!isPasswordValid) {
                throw new ResponseError(401, "Username or password is wrong");
            }
            user = yield prismaClient.user.update({
                where: {
                    username: loginRequest.username,
                },
                data: {
                    token: uuid(),
                },
            });
            const response = toUserResponse(user);
            response.token = user.token;
            return response;
        });
    }
    static get(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return toUserResponse(user);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = Validation.validate(UserValidation.UPDATE, request);
            if (updateRequest.name) {
                user.name = updateRequest.name;
            }
            if (updateRequest.password) {
                user.password = yield bcrypt.hash(updateRequest.password, 10);
            }
            const result = yield prismaClient.user.update({
                where: {
                    username: user.username,
                },
                data: user,
            });
            return toUserResponse(result);
        });
    }
    static logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prismaClient.user.update({
                where: {
                    username: user.username
                },
                data: {
                    token: null
                }
            });
            return toUserResponse(result);
        });
    }
}
export default UserServices;
