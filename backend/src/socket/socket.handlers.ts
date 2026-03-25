import { clientManager } from "./socket.clients";
import { SocketClient, WebSocketMessage } from "./socket.types";

// TODO: Как будет готова авторизация - добавить проверки для подключений

export const handleMessage = (ws: SocketClient, data: string) => {
  try {
    const message: WebSocketMessage = JSON.parse(data);

    switch (message.type) {
      case "join:admin":
        clientManager.addAdmin(ws);
        console.log("РОП подключился");
        break;
      case "join:user":
        if (message.userId) {
          clientManager.addUser(ws, message.userId);
          console.log(`Пользователь ${message.userId} подключился`);
        } else {
          console.warn("Ошибка при подключении пользователя");
        }
        break;
      case "ping":
        ws.send(JSON.stringify({ type: "pong" }));
        break;
      default:
        console.warn(`Неизвестный тип сообщения: ${message.type}`);
    }
  } catch (error) {
    console.error("Ошибка при обработке сообщения:", error);
  }
};

export const handleClose = (ws: SocketClient) => {
  clientManager.remove(ws);
  console.log("Клиент отключился");
};
