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
      const [
        totalUsers,
        newUsers,
        emailsSent,
        newsletters,
        nextCampaignTimestamp,
      ] = await Promise.all([
        this.service.totalUsers(),
        this.service.newUsers(),
        this.service.totalEmailsSent(),
        this.service.pastCampaigns(),
        this.service.upcomingCampaign(),
      ]);

      res.render("dashboard/home", {
        fullName: req.user?.fullName,
        totalUsers,
        newUsers,
        emailsSent,
        newsletters,
        nextCampaignTimestamp,
      });
    } catch (err) {
      next(err);
    }
  };
}
