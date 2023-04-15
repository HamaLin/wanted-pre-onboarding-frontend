import React from "react";
import styled from "styled-components";
import { InputDataTestidTypes } from "../../types";

export interface InputComponentProps {
  dataTestid: InputDataTestidTypes;
  name: string | undefined;
  value: string | undefined;
  style?: React.CSSProperties;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  type?: React.HTMLInputTypeAttribute | undefined;
}

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

export const CheckBox = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  min-width: 1.5rem;
  min-height: 1.5rem;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  cursor: pointer;

  &:checked {
    border: 2px solid #8f589a;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-color: #bd96f3;
  }
`;

export const Input = (props: InputComponentProps): JSX.Element => (
  <Wraper
    data-testid={props.dataTestid}
    value={props.value}
    name={props.name}
    onChange={props?.onChange}
    style={props?.style}
    onBlur={props?.onBlur}
    onKeyDown={props?.onKeyDown}
    type={props.type}
  />
);
