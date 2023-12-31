import { IRequest } from "@/constants";
import { NextFunction, Response } from "express";


const traceIdMiddleware = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  req.id = (req.get("x-request-id") as string) ?? undefined;
  res.setHeader("x-request-id", req.id ?? "NA");
  next();
};

export default traceIdMiddleware;
