import { Router } from "express";
import SubscriptionController from "@controller/subscriptions";
import { IRequest, Routes } from "@/constants";
import { onlyEmailSchema } from "@/schemas";
import ValidationMiddleware from "@middleware/validation";

export default class SubscriptionRoute implements Routes {
  public router: Router = Router();
  public controller = new SubscriptionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/subscribe',
      ValidationMiddleware(onlyEmailSchema),
      (req, res, next) => this.controller.subscribe(req as IRequest, res, next)
    );
    this.router.get(
      `/unsubscribe`,
      ValidationMiddleware(onlyEmailSchema),
      (req, res, next) =>
        this.controller.unsubscribe(req as IRequest, res, next)
    );
  }
}
