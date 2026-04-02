import { type NextFunction, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import { UserRepository } from "@/data-source";
import {
  clearAuthCookies,
  generateTokens,
  setAuthCookies,
  verifyAccessToken,
  verifyRefreshToken,
} from "@shared/utils/auth";
import ConflictError from "@shared/errors/conflict-error";
import InternalServerError from "@shared/errors/internal-server-error";
import UnauthorizedError from "@shared/errors/unauthorized-error";
import { COOKIES_NAME } from "@shared/constants";
import config from "@/config";
import ForbiddenError from "@shared/errors/forbidden-error";
import { TLoginUser, TRegisterBody } from "./user.types";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { login, password, name, role, registrationPassword }: TRegisterBody =
      req.body;

    if (registrationPassword !== config.REGISTRATION_SECRET)
      return next(new ForbiddenError("Неверный пароль администратора"));

    const existingUser = await UserRepository.findOne({ where: { login } });
    if (existingUser)
      return next(new ConflictError("Пользователь уже существует"));

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = UserRepository.create({
      login,
      password: hashedPassword,
      name,
      role: role || "others",
    });

    const savedUser = await UserRepository.save(newUser);

    res.status(201).json({
      success: true,
      data: {
        id: savedUser.id,
        login: savedUser.login,
        name: savedUser.name,
        role: savedUser.role,
      },
      message: "Пользователь успешно зарегистрирован",
    });
  } catch (error) {
    next(new InternalServerError("Ошибка при регистрации пользователя"));
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { login, password }: TLoginUser = req.body;

    const loginUser = await UserRepository.findOne({ where: { login } });
    if (!loginUser)
      return next(new UnauthorizedError("Неверный логин или пароль"));

    const passwordIsValid = await bcrypt.compare(password, loginUser.password);
    if (!passwordIsValid)
      return next(new UnauthorizedError("Неверный логин или пароль"));

    const { accessToken, refreshToken } = generateTokens(loginUser);
    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({
      success: true,
      data: {
        id: loginUser.id,
        login: loginUser.login,

        role: loginUser.role,
      },
      message: "Выполнен вход в систему",
    });
  } catch (error) {
    next(new InternalServerError("Ошибка при входе в систему"));
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.cookies[COOKIES_NAME.ACCESS_TOKEN];
    if (!accessToken)
      return next(new UnauthorizedError("Access Token не найден"));

    const decoded = verifyAccessToken(accessToken);
    if (!decoded) {
      clearAuthCookies(res);
      return next(new UnauthorizedError("Невалидный access token"));
    }

    const user = await UserRepository.findOne({ where: { id: decoded.id } });
    if (!user) return next(new UnauthorizedError("Пользователь не найден"));

    res.json({
      success: true,
      data: {
        id: user.id,
        login: user.login,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(new UnauthorizedError("Ошибка авторизации пользователя"));
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies[COOKIES_NAME.REFRESH_TOKEN];
    if (!refreshToken)
      return next(new UnauthorizedError("Refresh token не найден"));

    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      clearAuthCookies(res);
      return next(new UnauthorizedError("Невалидный refresh token"));
    }

    const user = await UserRepository.findOne({ where: { id: decoded.id } });

    if (!user) {
      clearAuthCookies(res);
      return next(new UnauthorizedError("Пользователь не найден"));
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
    setAuthCookies(res, accessToken, newRefreshToken);

    res.status(200).json({
      success: true,
      message: "Токен успешно обновлён",
    });
  } catch (error) {
    clearAuthCookies(res);
    next(new InternalServerError("Ошибка при обновлении токена"));
  }
};

export const logoutUser = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    clearAuthCookies(res);

    res.status(200).json({
      success: true,
      message: "Выполнен выход из системы",
    });
  } catch (error) {
    next(new InternalServerError("Ошибка при выходе из системы"));
  }
};
