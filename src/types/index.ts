export type InputDataTestidName =
  | "loginButton"
  | "emailInput"
  | "passwordInput"
  | "signupButton"
  | "newTodoInput"
  | "newTodoAddButton";

export type InputDataTestidTypes =
  | "email-input"
  | "password-input"
  | "signup-button"
  | "signin-button"
  | "new-todo-input"
  | "new-todo-add-button"
  | "modify-input";

export type TodoUpdateParameterType = "Check" | "TodoChange" | "Delete";

export type TodoUpdatePropsType = {
  id: number;
  updateType: TodoUpdateParameterType;
  value?: string | boolean;
};

export type TodoPropsType = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};
