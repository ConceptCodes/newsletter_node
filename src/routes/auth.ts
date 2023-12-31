import { Router } from "express";
import AuthController from "@controller/auth";
import { IRequest, Routes } from "@/constants";
import { loginSchema, registerSchema } from "@/schemas";
import ValidationMiddleware from "@middleware/validation";

export default class AuthRoute implements Routes {
  public path = "/auth";
  public router: Router = Router();
  public controller = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/login`,
      ValidationMiddleware(loginSchema),
      (req, res, next) => this.controller.login(req as IRequest, res, next)
    );
    this.router.get(`${this.path}/logout`, (req, res, next) =>
      this.controller.logout(req as IRequest, res, next)
    );
    this.router.post(
      `${this.path}/register`,
      ValidationMiddleware(registerSchema, "body"),
      (req, res, next) => this.controller.register(req as IRequest, res, next)
    );
  }
}
