import { InputDataTestidName, InputDataTestidTypes } from "../types";

export const AUTH_KEY_NAME = "access_token";

export const DATA_TEST_ID: Record<InputDataTestidName, InputDataTestidTypes> = {
  emailInput: "email-input",
  passwordInput: "password-input",
  loginButton: "signin-button",
  signupButton: "signup-button",
  newTodoInput: "new-todo-input",
  newTodoAddButton: "new-todo-add-button",
};

export const ROUTER_PATH_LIST = {
  login: "/signin",
  signup: "/singup",
  todo: "/todo",
};
