import { NextFunction, Response } from "express";

import ContactService from "@service/contact";
import { IRequest } from "@/constants";

export default class AuthController {
  private service: ContactService;

  constructor() {
    this.service = new ContactService();
  }

  public submit = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const { email, name, message } = req.body;
      await this.service.sendMessage({
        email,
        fullName: name,
        message,
      });

      res.render("success", {
        message: "",
      });
    } catch (err) {
      next(err);
    }
  };
}
