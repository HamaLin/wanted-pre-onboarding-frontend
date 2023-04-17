import React from "react";
import styled from "styled-components";
import { InputDataTestidTypes } from "../../types";

const Wraper = styled.button`
  cursor: pointer;
  width: 100%;
  min-height: 50px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  color: white;
  background-image: linear-gradient(to right, #7a589f, #8f589a);

  :hover {
    background-image: linear-gradient(to right, #6a488f, #b264c2);
  }

  :disabled {
    cursor: not-allowed;
    background-image: none;
    background-color: gray;
  }
`;

const Button = ({
  children,
  disabled,
  onClick,
  type,
  style,
  dataTestid,
}: {
  dataTestid: InputDataTestidTypes;
  children?: String;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}) => {
  return (
    <Wraper
      disabled={disabled}
      onClick={onClick}
      type={type}
      style={style}
      data-testid={dataTestid}
    >
      {children}
    </Wraper>
  );
};

export default Button;
