import { Router } from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "./user.controller";
import { loginValidation, registerValidation } from "./user.validation";

export const routesAuth = Router();

routesAuth.get("/me", getMe);
routesAuth.post("/register", registerValidation, registerUser);
routesAuth.post("/login", loginValidation, loginUser);
routesAuth.post("/refresh", refreshToken);
routesAuth.post("/logout", logoutUser);
