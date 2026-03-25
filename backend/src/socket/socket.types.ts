import { WebSocket } from "ws";

export type WebSocketMessage = {
  type: "join:admin" | "join:user" | "ping";
  userId?: string;
};

export type NotificationEvent =
  | "agreement:created"
  | "agreement:updated"
  | "agreement:deleted"
  | "pong";

export type SocketClient = WebSocket & {
  userId?: string;
  isAdmin?: boolean;
};
