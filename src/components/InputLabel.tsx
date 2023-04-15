import React from "react";
import styled from "styled-components";
import { FlexColumn } from "./ui/layout";
import { Input, InputComponentProps } from "./ui/Input";
import { ScriptType, TitleTypo } from "./ui/Typographies";

interface SignInputComponentType extends InputComponentProps {
  subject: string;
  label?: string;
}

const Wraper = styled(FlexColumn)`
  width: 100%;
`;

const InputLabel = (props: SignInputComponentType): React.ReactElement => {
  const {
    subject,
    label,
    dataTestid,
    name,
    value,
    onChange,
    onBlur,
    style,
    type,
    onKeyDown,
  } = props;
  return (
    <Wraper>
      {subject && <TitleTypo>{subject}</TitleTypo>}
      <Input
        dataTestid={dataTestid}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={style}
        type={type}
        onKeyDown={onKeyDown}
      />
      {label && <ScriptType style={{ color: "red" }}>{label}</ScriptType>}
    </Wraper>
  );
};

export default InputLabel;
