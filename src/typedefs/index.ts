export type InputPropsErrorType = {
  active: Boolean;
  errorMessage: String;
};

export type InputPropsType = {
  dataTestid?: String;
  value?: string;
  name?: string;
  style?: React.CSSProperties;
  inputType?: React.HTMLInputTypeAttribute;
};

export type InputLabelType = {
  subject?: String;
  inputType?: InputPropsType;
  label?: String;
};

export type LoginFormPropsType = {
  mail: { data: InputPropsType; error?: InputPropsErrorType };
  password: { data: InputPropsType; error?: InputPropsErrorType };
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
