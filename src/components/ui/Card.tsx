import React from "react";
import styled from "styled-components";
import { FlexColumn } from "./layout";

const Wraper = styled(FlexColumn)`
  background-color: #f6f6f6;
  box-shadow: 5px 8px 6px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 100%;
  height: 100%;
`;

const Card = ({
  children,
  style,
}: {
  children?: React.ReactElement;
  style?: React.CSSProperties | undefined;
}) => {
  return <Wraper style={style}>{children}</Wraper>;
};

export default Card;
