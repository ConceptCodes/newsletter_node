import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import AuthService from "@service/auth";
import { IRequest } from "@/constants";

export default class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  public login = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { token, refreshToken } = await this.service.login({
        email,
        password,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res
        .setHeader("Authorization", `Bearer ${token}`)
        .redirect("/api/dashboard");
    } catch (err) {
      next(err);
    }
  };

  public register = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token, refreshToken } = await this.service.register(req.body);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(StatusCodes.CREATED).json({ token });
    } catch (err) {
      next(err);
    }
  };

  public logout = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      await this.service.logout(req.user?.id || 0);
      res.clearCookie("refreshToken");
      res.status(StatusCodes.OK).send();
    } catch (err) {
      next(err);
    }
  };
}
