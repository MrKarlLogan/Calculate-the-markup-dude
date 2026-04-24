import { type NextFunction, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import { UserRepository } from "@/data-source";
import {
  clearAuthCookies,
  generateTokens,
  setAuthCookies,
  TUserPayload,
  verifyAccessToken,
  verifyRefreshToken,
} from "@shared/utils/auth";
import ConflictError from "@shared/errors/conflict-error";
import InternalServerError from "@shared/errors/internal-server-error";
import UnauthorizedError from "@shared/errors/unauthorized-error";
import { COOKIES_NAME } from "@shared/constants";
import config from "@/config";
import ForbiddenError from "@shared/errors/forbidden-error";
import { TLoginUser, TRegisterBody, TRoles } from "./user.types";
import NotFoundError from "@/shared/errors/not-found-error";

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await UserRepository.find();

    const response = users.map(({ password, ...otherData }) => otherData);

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    next(new InternalServerError("Ошибка при получении списка пользователей"));
  }
};

export const updateRoleUser = async (
  req: Request & { user?: TUserPayload },
  res: Response,
  next: NextFunction,
) => {
  try {
    const { role }: { role: TRoles } = req.body;
    const id = req.params.id.toString();

    if (req.user?.id === id)
      return next(new ForbiddenError("Нельзя изменить свою роль"));

    const updatedUser = await UserRepository.findOne({
      where: { id },
    });

    if (!updatedUser)
      return next(new NotFoundError(`Пользователь с id: ${id} не найден`));

    updatedUser.role = role;

    await UserRepository.save(updatedUser);

    res.status(200).json({
      success: true,
      data: {
        id: updatedUser.id,
        login: updatedUser.login,
        role: updatedUser.role,
      },
      message: `Роль пользователя с id ${id} успешно обновлена`,
    });
  } catch (error) {
    next(
      new InternalServerError(
        `Ошибка при изменении роли пользователя с id: ${req.params.id}`,
      ),
    );
  }
};

export const deleteUser = async (
  req: Request & { user?: TUserPayload },
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id.toString();

    if (req.user?.id === id)
      return next(new ForbiddenError("Нельзя удалить самого себя"));

    const result = await UserRepository.delete(id);

    if (result.affected === 0)
      return next(new NotFoundError(`Пользователь с id: ${id} не найден`));

    res.status(200).json({
      success: true,
      message: `Пользователь с id: ${id} успешно удален`,
    });
  } catch (error) {
    next(
      new InternalServerError(
        `Ошибка при удалении пользователя с id: ${req.params.id}`,
      ),
    );
  }
};

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

    if (user.role !== decoded.role) {
      clearAuthCookies(res);
      const { accessToken, refreshToken } = generateTokens(user);
      setAuthCookies(res, accessToken, refreshToken);
    }

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
