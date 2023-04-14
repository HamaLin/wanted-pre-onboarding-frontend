import React from "react";
import styled from "styled-components";
import { FlexColumn } from "./ui/layout";
import { Input } from "./ui/Input";
import { ScriptType, TitleTypo } from "./ui/Typographies";
import { InputPropsErrorType, InputPropsType } from "../typedefs";

const Wraper = styled(FlexColumn)`
  width: 100%;
`;

const InputLabel = ({
  subject,
  inputProps,
  style,
  onChange,
  onBlur,
  inputStyle,
  error,
}: {
  subject?: String;
  inputProps?: InputPropsType;
  style?: React.CSSProperties;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  inputStyle?: React.CSSProperties;
  error?: InputPropsErrorType;
}) => {
  return (
    <Wraper style={style}>
      {subject && <TitleTypo>{subject}</TitleTypo>}
      <Input
        inputProps={inputProps}
        onChange={onChange}
        onBlur={onBlur}
        style={inputStyle}
      />
      {error?.active && (
        <ScriptType style={error?.active && { color: "red" }}>
          {error?.errorMessage}
        </ScriptType>
      )}
    </Wraper>
  );
};

export default InputLabel;
