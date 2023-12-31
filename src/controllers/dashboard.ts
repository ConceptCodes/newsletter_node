import { NextFunction, Response } from "express";

import DashboardService from "@service/dashboard";
import { IRequest } from "@/constants";

export default class DashboardController {
  private service: DashboardService;

  constructor() {
    this.service = new DashboardService();
  }

  public homeView = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log("req.user", req.user)

      const [totalUsers, newUsers, emailsSent] = await Promise.all([
        this.service.totalUsers(),
        this.service.newUsers(),
        this.service.emailsSent(),
      ]);

      res.render("dashboard/home", {
        fullName: req.user?.fullName,
        totalUsers,
        newUsers,
        emailsSent,
      });
    } catch (err) {
      next(err);
    }
  };
}
