import {
  TNotificationRequest,
  TNotificationResponse,
  TNotificationCreateResponse,
  TNotificationUpdateResponse,
  TNotificationDeleteResponse,
} from "@/entities/notification/types/types";
import { URL_PATH } from "../config/constants";
import { axios_instance } from "./axios-instance";

axios_instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data && typeof error.response.data === "object") {
      return Promise.resolve({ ...error.response, data: error.response.data });
    }
    return Promise.reject(error);
  },
);

const notificationApi = {
  getAllMessage: async () => {
    const response = await axios_instance.get<TNotificationResponse>(
      URL_PATH.NOTIFICATION,
    );
    return response.data;
  },
  createMessage: async (data: TNotificationRequest) => {
    const response = await axios_instance.post<TNotificationCreateResponse>(
      URL_PATH.NOTIFICATION,
      data,
    );
    return response.data;
  },
  updateMessage: async (data: TNotificationRequest, id: string) => {
    const response = await axios_instance.put<TNotificationUpdateResponse>(
      `${URL_PATH.NOTIFICATION}/${id}`,
      data,
    );
    return response.data;
  },
  deleteMessage: async (id: string) => {
    const response = await axios_instance.delete<TNotificationDeleteResponse>(
      `${URL_PATH.NOTIFICATION}/${id}`,
    );
    return response.data;
  },
};

export default notificationApi;
