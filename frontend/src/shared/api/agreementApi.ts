import {
  TUpdateAgreementPayload,
  TAgreementsResponse,
  TAgreementResponse,
  TDeleteAgreementResponse,
  TCreateAgreementRequest,
} from "@/entities/priceAgreement/types/types";
import { URL_PATH } from "../config/constants";
import { axios_instance } from "./axios-instance";

const agreementApi = {
  getAllMessages: async () => {
    const response = await axios_instance.get<TAgreementsResponse>(
      URL_PATH.AGREEMENT,
    );
    return response.data;
  },

  createMessage: async (data: TCreateAgreementRequest) => {
    const response = await axios_instance.post<TAgreementResponse>(
      URL_PATH.AGREEMENT,
      data,
    );
    return response.data;
  },

  updateMessage: async (id: string, payload: TUpdateAgreementPayload) => {
    const response = await axios_instance.patch<TAgreementResponse>(
      `${URL_PATH.AGREEMENT}/${id}`,
      payload,
    );
    return response.data;
  },

  deleteMessage: async (id: string) => {
    const response = await axios_instance.delete<TDeleteAgreementResponse>(
      `${URL_PATH.AGREEMENT}/${id}`,
    );
    return response.data;
  },
};

export default agreementApi;
