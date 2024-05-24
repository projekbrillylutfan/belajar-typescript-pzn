import { NextFunction, Response, Request } from "express";
import { ZodError } from "zod";
import ResponseError from "../error/response-error";

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    const errorMessages = error.errors.map(err => err.message);
    res.status(400).json({
      status: 400,
      message: errorMessages,
      data: null
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: error.message,
    });
  } else {
    res.status(500).json({
      errors: error.message,
    });
  }
};
