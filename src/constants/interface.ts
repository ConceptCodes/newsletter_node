import { Request, Router } from "express";
import { Services } from "./enums";
import { UserPayload } from ".";

export interface IHealthStatus {
  service: keyof typeof Services;
  connected: boolean;
}

export interface Routes {
  path?: string;
  router: Router;
}

export interface IRequest extends Request {
  user?: UserPayload;
  id: string;
}
