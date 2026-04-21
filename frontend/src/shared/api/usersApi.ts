import {
  IAuthData,
  IResponseDeleteUser,
  TApiResponse,
} from "@/entities/user/types/types";
import { URL_PATH } from "../config/constants";
import { axios_instance } from "./axios-instance";

const usersApi = {
  getAllusers: async () => {
    const response = await axios_instance.get<TApiResponse<IAuthData[]>>(
      `${URL_PATH.USERS}/all`,
    );
    return response.data;
  },

  updateUser: async (data: Pick<IAuthData, "role">, id: string) => {
    const response = await axios_instance.patch<TApiResponse<IAuthData>>(
      `${URL_PATH.USERS}/${id}`,
      data,
    );
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await axios_instance.delete<IResponseDeleteUser>(
      `${URL_PATH.USERS}/${id}`,
    );
    return response.data;
  },
};

export default usersApi;
