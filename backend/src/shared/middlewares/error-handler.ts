import { type Request, type Response, type NextFunction } from "express";

export const errorHandler = (
  err: Error & { statusCode?: number },
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Внутренняя ошибка сервера";

  console.error(`[${new Date().toISOString()}] ${statusCode}: ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
  });
};
