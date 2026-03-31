import { WEBSOCKET_MESSAGE_TYPE } from "@shared/constants";
import { clientManager } from "./socket.clients";
import { SocketClient, WebSocketMessage } from "./socket.types";

export const handleMessage = (ws: SocketClient, data: string) => {
  try {
    const message: WebSocketMessage = JSON.parse(data);

    switch (message.type) {
      case WEBSOCKET_MESSAGE_TYPE.JOIN_ADMIN:
        if (ws.isAdmin) clientManager.addAdmin(ws);
        break;
      case WEBSOCKET_MESSAGE_TYPE.JOIN_USER:
        if (message.userId && ws.userId === message.userId)
          clientManager.addUser(ws, message.userId);
        break;
      case WEBSOCKET_MESSAGE_TYPE.PING:
        ws.send(JSON.stringify({ type: WEBSOCKET_MESSAGE_TYPE.PONG }));
        break;
      default:
        console.warn(`Неизвестный тип сообщения: ${message.type}`);
    }
  } catch (error) {
    console.error("Ошибка при обработке сообщения:", error);
  }
};

export const handleClose = (ws: SocketClient) => clientManager.remove(ws);
