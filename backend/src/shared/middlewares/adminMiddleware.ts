import { type Request, type Response, type NextFunction } from "express";
import { TUserPayload } from "../utils/auth";
import { USER_ROLES } from "../constants";
import ForbiddenError from "../errors/forbidden-error";

export const adminMiddleware = (
  req: Request & { user?: TUserPayload },
  _res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== USER_ROLES.ADMIN)
    return next(new ForbiddenError("Отсутствуют необходимые права доступа"));

  next();
};
