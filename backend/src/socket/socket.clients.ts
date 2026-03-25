import { SocketClient } from "./socket.types";

const clients = new Set<SocketClient>();
const adminClients = new Set<SocketClient>();
const userClients = new Map<string, SocketClient>();

export const clientManager = {
  add(client: SocketClient) {
    clients.add(client);
  },

  remove(client: SocketClient) {
    clients.delete(client);
    adminClients.delete(client);
    if (client.userId) userClients.delete(client.userId);
  },

  addAdmin(client: SocketClient) {
    client.isAdmin = true;
    adminClients.add(client);
  },

  addUser(client: SocketClient, userId: string) {
    client.userId = userId;
    userClients.set(userId, client);
  },

  getAdminClients() {
    return adminClients;
  },

  getUserClient(userId: string) {
    return userClients.get(userId);
  },

  getAllClients() {
    return clients;
  },
};
