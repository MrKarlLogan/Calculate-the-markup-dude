import jwt from "jsonwebtoken";
import { Response } from "express";
import config from "@/config";
import { IUser } from "@modules/user";
import { COOKIES_NAME } from "@shared/constants";

type TUserPayload = Omit<IUser, "password">;
type TVerifyTokens = Pick<TUserPayload, "id">;

export const generateTokens = (user: TUserPayload) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      login: user.login,
      name: user.name,
      role: user.role,
    },
    config.JWT_SECRET!,
    { expiresIn: "1h" },
  );

  const refreshToken = jwt.sign({ id: user.id }, config.JWT_REFRESH_SECRET!, {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): TVerifyTokens | null => {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET!) as TVerifyTokens;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string): TVerifyTokens | null => {
  try {
    const decoded = jwt.verify(
      token,
      config.JWT_REFRESH_SECRET!,
    ) as TVerifyTokens;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  const isProduction = config.NODE_ENV === "production";

  res.cookie(COOKIES_NAME.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    maxAge: 60 * 60 * 1000,
  });

  res.cookie(COOKIES_NAME.REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie(COOKIES_NAME.ACCESS_TOKEN);
  res.clearCookie(COOKIES_NAME.REFRESH_TOKEN);
};
