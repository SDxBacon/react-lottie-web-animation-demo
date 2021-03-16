import styled from "styled-components";
import Flex from "common/Flex";

export const Wrapper = styled(Flex)`
  cursor: pointer;
  user-select: none;
  width: 100px;
  height: 40px;
  margin-top: 32px;
  background: #418172;
  border-radius: 16px;
  box-shadow: 0px 0px 11px 0px var(--Green_50_, rgba(0, 255, 196, 0.5));
  align-items: center;
  justify-content: center;

  &.rolling {
    background: #ff5c5c;
    box-shadow: 0px 1px 5px 0px var(--Red, #ff5c5c);
  }
`;
