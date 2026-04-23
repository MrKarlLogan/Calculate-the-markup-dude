import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getMe,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  updateRoleUser,
} from "./user.controller";
import { loginValidation, registerValidation } from "./user.validation";
import { authMiddleware } from "@/shared/middlewares/authMiddleware";
import { adminMiddleware } from "@/shared/middlewares/adminMiddleware";

export const routesAuth = Router();

routesAuth.get("/me", getMe);
routesAuth.post("/register", registerValidation, registerUser);
routesAuth.post("/login", loginValidation, loginUser);
routesAuth.post("/refresh", refreshToken);
routesAuth.post("/logout", logoutUser);

routesAuth.get("/users/all", authMiddleware, adminMiddleware, getAllUsers);
routesAuth.patch("/users/:id", authMiddleware, adminMiddleware, updateRoleUser);
routesAuth.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);
