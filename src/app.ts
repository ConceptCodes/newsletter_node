import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import morganBody from "morgan-body";
import path from "path";

import errorMiddleware from "@middleware/error";
import notFoundMiddleware from "@middleware/notfound";
import traceIdMiddleware from "@middleware/trace";
import { env } from "@lib/env";
import { Routes } from "@/constants";

class App {
  public app: any;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = env.PORT;
    this.env = env.NODE_ENV || "development";

    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");
    this.app.use(express.static(path.join(__dirname, "public")));

    this.initializeViews();
    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeNotFoundHandling();
    this.initializeErrorHandling();
  }

  public listen(): void {
    this.app.listen(this.port as number, () => {
      console.info("=====================================================");
      console.info(`================= ENV: ${this.env} ==================`);
      console.info(
        `===== 📰 Newsletter Node listening on PORT: ${this.port} ===========`
      );
      console.info("=====================================================");
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private initializeMiddleware(): void {
    this.app.use(traceIdMiddleware);
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    morganBody(this.app, {
      logRequestId: true,
      immediateReqLog: true,
      noColors: env.NODE_ENV !== "local",
      logRequestBody: env.NODE_ENV === "local",
      logResponseBody: env.NODE_ENV === "local",
    });
  }

  // @ts-ignore
  private initializeRoutes(routes: Routes[]): void {
    routes.forEach((route) => {
      this.app.use("/api", route.router);
    });
  }

  private initializeViews(): void {
    this.app.get("/", (_: Request, res: Response) => {
      res.render("index");
    });

    this.app.get("/privacy-policy", (_: Request, res: Response) => {
      res.render("privacy");
    });

    this.app.get("/terms-of-service", (_: Request, res: Response) => {
      res.render("terms");
    });

    // about
    this.app.get("/about", (_: Request, res: Response) => {
      res.render("about");
    });

    this.app.get("/contact", (_: Request, res: Response) => {
      res.render("contact");
    });

    this.app.get("/login", (_: Request, res: Response) => {
      res.render("login");
    });
  }

  private initializeNotFoundHandling(): void {
    this.app.use("*", notFoundMiddleware);
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }
}

export default App;
