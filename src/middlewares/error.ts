import { StatusCodes } from "http-status-codes";
import { NextFunction, Response } from "express";

import { HttpException } from "@/exceptions";
import { IRequest } from "@/constants";

const ErrorMiddleware = (
  error: HttpException,
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || StatusCodes.SERVICE_UNAVAILABLE;
    const message: string = error.message || "Error in the System";
    console.error(
      `[${req.id}] ${req.method} ${req.path} >> STATUS_CODE:: ${status} >> MESSAGE: ${message}`
    );
    res.status(status).json({
      message,
    });
  } catch (error) {
    next(error);
  }
};

export default ErrorMiddleware;
