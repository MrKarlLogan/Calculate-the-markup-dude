import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "@/config";
import UnauthorizedError from "../errors/unauthorized-error";
import { COOKIES_NAME } from "../constants";
import {
  clearAuthCookies,
  generateTokens,
  setAuthCookies,
  TUserPayload,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/auth";
import { UserRepository } from "@/data-source";

export const authMiddleware = async (
  req: Request & { user?: TUserPayload },
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.cookies[COOKIES_NAME.ACCESS_TOKEN];
    const refreshToken = req.cookies[COOKIES_NAME.REFRESH_TOKEN];

    if (accessToken) {
      const decoded = verifyAccessToken(accessToken);

      if (decoded) {
        req.user = decoded;
        return next();
      }
    }

    if (refreshToken) {
      const refreshDecoded = verifyRefreshToken(refreshToken);

      if (refreshDecoded) {
        const user = await UserRepository.findOne({
          where: { id: refreshDecoded.id },
        });

        if (user) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            generateTokens(user);
          setAuthCookies(res, newAccessToken, newRefreshToken);

          req.user = { id: user.id, login: user.login, role: user.role };
          return next();
        }
      }
    }

    clearAuthCookies(res);
    return next(
      new UnauthorizedError(
        "Время активной сессии истекло. Сейчас вы автоматически перейдете на страницу авторизации",
      ),
    );
  } catch (error) {
    return next(new UnauthorizedError("Недействительный токен"));
  }
};
