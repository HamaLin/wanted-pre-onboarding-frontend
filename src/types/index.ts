export type InputDataTestidName =
  | "loginButton"
  | "emailInput"
  | "passwordInput"
  | "signupButton";

export type InputDataTestidTypes =
  | "email-input"
  | "password-input"
  | "signup-button"
  | "signin-button"
  | "new-todo-input"
  | "new-todo-add-button";

export type InputComponentDatas = {
  dataTestid: InputDataTestidTypes;
  name: string | undefined;
  value: string | undefined;
};

export type InputPropsErrorType = {
  active: Boolean;
  errorMessage: String;
};

export type InputLabelType = {
  subject?: String;
  inputType?: InputComponentDatas;
  label?: String;
};

export type LoginFormPropsType = {
  mail: { data: InputComponentDatas; error?: InputPropsErrorType };
  password: { data: InputComponentDatas; error?: InputPropsErrorType };
};

export type TodoUpdateParameterType = "Check" | "TodoChange" | "Delete";

export type TodoUpdatePropsType = {
  id: number;
  changeType: TodoUpdateParameterType;
  value?: string | boolean;
};

export type TodoPropsType = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};
