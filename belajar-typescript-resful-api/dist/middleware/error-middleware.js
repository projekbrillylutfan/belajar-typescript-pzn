"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const response_error_1 = __importDefault(require("../error/response-error"));
const errorMiddleware = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (error instanceof zod_1.ZodError) {
        const errorMessages = error.errors.map(err => err.message);
        res.status(400).json({
            status: 400,
            message: errorMessages,
            data: null
        });
    }
    else if (error instanceof response_error_1.default) {
        res.status(error.status).json({
            status: error.status,
            message: error.message,
            data: null
        });
    }
    else {
        res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
});
exports.errorMiddleware = errorMiddleware;
