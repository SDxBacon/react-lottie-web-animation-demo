import classnames from "classnames";
import { IDLE, BUSY } from "constants/button";
import { Wrapper } from "./Styled";

const Button = ({ state, onAnimationStart }) => {
  return (
    <Wrapper
      className={classnames({ rolling: state === BUSY })}
      onClick={onAnimationStart}
    >
      {state === IDLE ? "Click me" : "Rolling ..."}
    </Wrapper>
  );
};

export default Button;
