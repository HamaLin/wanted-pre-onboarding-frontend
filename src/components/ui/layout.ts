import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexAll = styled(Flex)`
  align-items: center;
  justify-content: center;
`;
