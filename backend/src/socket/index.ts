import { WebSocketServer } from "ws";
import { Server } from "http";
import { SocketClient } from "./socket.types";
import { clientManager } from "./socket.clients";
import { handleClose, handleMessage } from "./socket.handlers";

export const initSocket = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: SocketClient) => {
    console.log("Клиент подключился");

    clientManager.add(ws);

    ws.on("message", (data: string) => handleMessage(ws, data));
    ws.on("close", () => handleClose(ws));
  });

  return wss;
};

export * from "./socket.notifications";
