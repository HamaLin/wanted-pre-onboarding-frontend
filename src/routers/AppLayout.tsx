import React from "react";
import styled from "styled-components";
import { FlexAll } from "../components/ui/layout";

const Wraper = styled(FlexAll)`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(#654a86, #534292);
`;

const AppLayout = ({ children }: { children: React.ReactElement }) => {
  return <Wraper>{children}</Wraper>;
};

export default AppLayout;
