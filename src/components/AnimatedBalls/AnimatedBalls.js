import AnimatedBall from "../AnimatedBall";
import { Wrapper } from "./Styled";

const AnimatedBalls = ({ initialBalls, onAnimationStop }) => {
  return (
    <Wrapper>
      {initialBalls.map((ball, i) => {
        return (
          <AnimatedBall
            key={i}
            ballIndex={i}
            initialBall={ball}
            onFinished={onAnimationStop}
          />
        );
      })}
    </Wrapper>
  );
};

export default AnimatedBalls;
