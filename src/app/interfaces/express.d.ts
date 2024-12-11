// express.d.ts
import * as express from "express";
import { IAuthUser } from "./common";

declare global {
  namespace Express {
    interface Request {
      user: IAuthUser;
    }
  }
}
