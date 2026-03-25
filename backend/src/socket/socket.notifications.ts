import { WebSocket } from "ws";
import { NotificationEvent } from "./socket.types";
import { clientManager } from "./socket.clients";

const sendToClient = (
  client: WebSocket,
  event: NotificationEvent,
  data: any,
) => {
  if (client.readyState === WebSocket.OPEN) {
    const message = JSON.stringify({ event, data });
    client.send(message);
  }
};

export const notifyAdmins = (event: NotificationEvent, data: any) => {
  const admins = clientManager.getAdminClients();
  admins.forEach((admin) => sendToClient(admin, event, data));
};

export const notifyUser = (
  userId: string,
  event: NotificationEvent,
  data: any,
) => {
  const client = clientManager.getUserClient(userId);
  if (client) sendToClient(client, event, data);
};

export const notifyAll = (event: NotificationEvent, data: any) => {
  const allClients = clientManager.getAllClients();
  allClients.forEach((client) => sendToClient(client, event, data));
};
