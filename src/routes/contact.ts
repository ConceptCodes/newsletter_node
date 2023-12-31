import { Router } from "express";
import ContactController from "@controller/contact";
import { IRequest, Routes } from "@/constants";
import { contactUsSchema } from "@/schemas";
import ValidationMiddleware from "@middleware/validation";

export default class ContactRoute implements Routes {
  public path = "/contact";
  public router: Router = Router();
  public controller = new ContactController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      this.path,
      ValidationMiddleware(contactUsSchema),
      (req, res, next) => this.controller.submit(req as IRequest, res, next)
    );
  }
}
