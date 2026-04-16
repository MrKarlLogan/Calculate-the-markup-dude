import axios from "axios";
import { config } from "@shared/config";

export const axios_instance = axios.create({
  baseURL: config.API_URL,
  withCredentials: true,
});
