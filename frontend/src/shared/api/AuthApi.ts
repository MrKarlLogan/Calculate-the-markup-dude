import {
  TCheckAuthResponse,
  TLoginResponse,
  TLogoutResponse,
  TRefreshResponse,
  TRegisterResponse,
} from "@entities/user/types/types";
import { URL_PATH } from "../config/constants";
import { axios_instance } from "./axios-instance";

const authApi = {
  login: async (data: {
    login: string;
    password: string;
  }): Promise<TLoginResponse> => {
    const response = await axios_instance.post<TLoginResponse>(
      URL_PATH.LOGIN,
      data,
    );
    return response.data;
  },

  register: async (data: {
    login: string;
    password: string;
    name: string;
    role: string;
    registrationPassword: string;
  }): Promise<TRegisterResponse> => {
    const response = await axios_instance.post<TRegisterResponse>(
      URL_PATH.REGISTER,
      data,
    );
    return response.data;
  },

  checkAuth: async (): Promise<TCheckAuthResponse> => {
    const response = await axios_instance.get<TCheckAuthResponse>(
      URL_PATH.GET_ME,
    );
    return response.data;
  },

  refreshToken: async (): Promise<TRefreshResponse> => {
    const response = await axios_instance.post<TRefreshResponse>(
      URL_PATH.REFRESH_TOKEN,
    );
    return response.data;
  },

  logout: async (): Promise<TLogoutResponse> => {
    const response = await axios_instance.post<TLogoutResponse>(
      URL_PATH.LOGOUT,
    );

    return response.data;
  },
};

export default authApi;
