import { InputDataTestidName, InputDataTestidTypes } from "../types";

export const API_HOST = "https://www.pre-onboarding-selection-task.shop/";

export const AUTH_KEY_NAME = "access_token";

export const NEW_TODO = {
  id: 0,
  todo: "",
  isCompleted: false,
  userId: 0,
};

export const DATA_TEST_ID: Record<InputDataTestidName, InputDataTestidTypes> = {
  emailInput: "email-input",
  passwordInput: "password-input",
  loginButton: "signin-button",
  signupButton: "signup-button",
};

export const ROUTER_PATH_LIST = {
  login: "/signin",
  signup: "/singup",
  todo: "/todo",
};
