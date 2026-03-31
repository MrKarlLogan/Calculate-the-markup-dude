import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "@/config";
import UnauthorizedError from "../errors/unauthorized-error";
import { COOKIES_NAME } from "../constants";
import { TUserPayload } from "../utils/auth";

export const authMiddleware = (
  req: Request & { user?: TUserPayload },
  _res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.cookies[COOKIES_NAME.ACCESS_TOKEN];
    if (!accessToken)
      return next(
        new UnauthorizedError("Токен не найден. Требуется авторизация"),
      );

    const decoded = jwt.verify(accessToken, config.JWT_SECRET!) as TUserPayload;

    req.user = decoded;

    next();
  } catch (error) {
    return next(new UnauthorizedError("Недействительный токен"));
  }
};
