import { config } from "@shared/config";
import { TLoginResponse, TRegisterResponse } from "./types";

const Api = {
  login: async (data: {
    login: string;
    password: string;
  }): Promise<TLoginResponse> => {
    const response = await fetch(`${config.API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    return response.json();
  },

  register: async (data: {
    login: string;
    password: string;
    name: string;
    role: string;
    registrationPassword: string;
  }): Promise<TRegisterResponse> => {
    const response = await fetch(`${config.API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

export default Api;
