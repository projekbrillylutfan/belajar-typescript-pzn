var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ZodError } from "zod";
import ResponseError from "../error/response-error.js";
export const errorMiddleware = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (error instanceof ZodError) {
        res.status(400).json({
            errors: `Validation Error: ${JSON.stringify(error)}`,
        });
    }
    else if (error instanceof ResponseError) {
        res.status(error.status).json({
            errors: error.message,
        });
    }
    else {
        res.status(500).json({
            errors: error.message,
        });
    }
});
