import { NextFunction, Response } from "express";

import SubscriptionService from "@service/subscription";
import { IRequest } from "@/constants";
import { StatusCodes } from "http-status-codes";

export default class SubscriptionController {
  private service: SubscriptionService;

  constructor() {
    this.service = new SubscriptionService();
  }

  public subscribe = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body;
      await this.service.subscribe({ email });
      res.status(StatusCodes.OK).json({
        success: true,
        message:
          "Thank you for subscribing to our newsletter. You'll start receiving updates and news from us soon.",
      });
    } catch (err) {
      next(err);
    }
  };

  public unsubscribe = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body;
      await this.service.unsubscribe({ email });
      res.render("success", {
        message: "You have successfully unsubscribed from our newsletter!",
      });
    } catch (err) {
      next(err);
    }
  };
}
