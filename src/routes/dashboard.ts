import { NextFunction, Request, Response, Router } from "express";

import DashboardController from "@controller/dashboard";
import { IRequest, Routes } from "@/constants";
import { authMiddleware } from "@middleware/auth";

class DashboardRoute implements Routes {
  public path = "/dashboard";
  public router: Router = Router();
  public controller = new DashboardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      this.path,
      [
        (req: Request, res: Response, next: NextFunction) =>
          authMiddleware(req as IRequest, res, next),
        // isRole(["ADMIN"]),
      ],
      // @ts-ignore
      this.controller.homeView
    );
  }
}

export default DashboardRoute;
