import { WebSocketServer } from "ws";
import { Server } from "http";
import { SocketClient } from "./socket.types";
import { clientManager } from "./socket.clients";
import { handleClose, handleMessage } from "./socket.handlers";
import { parseCookies } from "@shared/utils/parseCookies";
import { COOKIES_NAME, USER_ROLES } from "@shared/constants";
import { verifyAccessToken } from "@shared/utils/auth";

export const initSocket = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: SocketClient, req) => {
    const cookies = parseCookies(req.headers.cookie);

    const accessToken = cookies.get(COOKIES_NAME.ACCESS_TOKEN);
    if (!accessToken) return ws.close(1008, "Произошла ошибка авторизации");

    const payload = verifyAccessToken(accessToken);
    if (!payload) return ws.close(1008, "Невалидный токен");

    ws.userId = payload.id;
    ws.login = payload.login;
    ws.isAdmin = payload.role === USER_ROLES.ADMIN;

    clientManager.add(ws);

    ws.on("message", (data: string) => handleMessage(ws, data));
    ws.on("close", () => handleClose(ws));
  });

  return wss;
};
