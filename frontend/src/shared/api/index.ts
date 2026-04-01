import { config } from "@shared/config";
import {
  TCheckAuthResponse,
  TLoginResponse,
  TLogoutResponse,
  TRefreshResponse,
  TRegisterResponse,
} from "./types";
import { URL_PATH } from "../config/constants";

const Api = {
  login: async (data: {
    login: string;
    password: string;
  }): Promise<TLoginResponse> => {
    const response = await fetch(`${config.API_URL}${URL_PATH.LOGIN}`, {
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
    const response = await fetch(`${config.API_URL}${URL_PATH.REGISTER}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    return response.json();
  },

  checkAuth: async (): Promise<TCheckAuthResponse> => {
    const response = await fetch(`${config.API_URL}${URL_PATH.GET_ME}`, {
      credentials: "include",
    });

    return response.json();
  },

  refreshToken: async (): Promise<TRefreshResponse> => {
    const response = await fetch(`${config.API_URL}${URL_PATH.REFRESH_TOKEN}`, {
      method: "POST",
      credentials: "include",
    });

    return response.json();
  },

  logout: async (): Promise<TLogoutResponse> => {
    const response = await fetch(`${config.API_URL}${URL_PATH.LOGOUT}`, {
      method: "POST",
      credentials: "include",
    });

    return response.json();
  },
};

export default Api;
