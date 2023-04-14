import React from "react";
import styled from "styled-components";
import { InputPropsType } from "../../typedefs";

const Wraper = styled.input`
  width: 100%;
  border: none;
  flex-grow: 1;
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #e1e1e1;
  min-height: 40px;

  :focus {
    outline: none !important;
    border-color: #d6a8e9;
    box-shadow: 0 0 10px #d6a8e9;
    ::placeholder {
    }
  }
`;

export const Input = ({
  inputProps,
  style,
  onChange,
  onBlur,
  onKeyDown,
}: {
  inputProps?: InputPropsType;
  style?: React.CSSProperties;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}) => {
  return (
    <Wraper
      data-testid={inputProps?.dataTestid}
      value={inputProps?.value}
      name={inputProps?.name}
      onChange={onChange}
      style={style}
      type={inputProps?.inputType}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
};

export const CheckBox = () => {
  return <Wraper type="checkbox" style={{ minHeight: "30px" }} />;
};
