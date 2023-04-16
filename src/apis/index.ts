import axios, { AxiosRequestConfig, AxiosResponse, AxiosStatic } from "axios";
import { AUTH_KEY_NAME } from "../constants";

const API_HOST = "https://www.pre-onboarding-selection-task.shop/";
const ACCESS_TOKEN = localStorage.getItem(AUTH_KEY_NAME);

type ApiList =
  | "loginSignin"
  | "loginSignup"
  | "todoUpdate"
  | "todoDelete"
  | "todoGet"
  | "todoAdd";

const API_PATH: Record<ApiList, string> = {
  loginSignin: "auth/signin",
  loginSignup: "auth/signup",
  todoDelete: "todos/",
  todoUpdate: "todos/",
  todoGet: "todos",
  todoAdd: "todos",
};

const AXIOS_CONFIG: Record<ApiList, AxiosRequestConfig<Record<string, any>>> = {
  loginSignin: {
    method: "POST",
    url: API_HOST + API_PATH.loginSignin,
    headers: {
      "Content-Type": "application/json",
    },
  },
  loginSignup: {
    method: "POST",
    url: API_HOST + API_PATH.loginSignup,
    headers: {
      "Content-Type": "application/json",
    },
  },
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
  todoGet: {
    method: "GET",
    url: API_HOST + API_PATH.todoGet,
    headers: {
      Authorization: ACCESS_TOKEN,
    },
  },
  todoAdd: {
    method: "POST",
    url: API_HOST + API_PATH.todoAdd,
    headers: {
      Authorization: ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
  },
};

export const axiosApi = async (
  apiType: ApiList,
  body: Record<string, any> | undefined,
  parameter?: any
): Promise<AxiosResponse> => {
  let config = { ...AXIOS_CONFIG[apiType], data: body };

  if ((apiType === "todoDelete" || apiType === "todoUpdate") && parameter)
    config = { ...config, url: config.url + parameter };

  const res: AxiosResponse = await axios(config);

  return res;
};
