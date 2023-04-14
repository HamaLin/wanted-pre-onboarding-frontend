import axios, { AxiosRequestConfig } from "axios";
import { AUTH_KEY_NAME } from "../constants";
const API_HOST = "https://www.pre-onboarding-selection-task.shop/";
const ACCESS_TOKEN = localStorage.getItem(AUTH_KEY_NAME);

const API_PATH: Record<ApiList, string> = {
  todoDelete: "todos/",
  todoUpdate: "todos/",
};

type ApiList = "todoUpdate" | "todoDelete";

const AXIOS_CONFIG: Record<ApiList, AxiosRequestConfig<Record<string, any>>> = {
  todoUpdate: {
    method: "PUT",
    url: API_HOST + API_PATH.todoUpdate,
    headers: {
      Authorization: ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
  },
  todoDelete: {
    method: "DELETE",
    url: API_HOST + API_PATH.todoDelete,
    headers: {
      Authorization: ACCESS_TOKEN,
    },
  },
};

export const axiosApi = async (
  apiType: ApiList,
  body: Record<string, any> | undefined,
  parameter?: any
): Promise<Response> => {
  let config = { ...AXIOS_CONFIG[apiType], data: body };

  if ((apiType === "todoDelete" || apiType === "todoUpdate") && parameter)
    config = { ...config, url: config.url + parameter };

  const res: Response = await axios(config);

  return res;
};
