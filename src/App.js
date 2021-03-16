import { useState, useCallback } from "react";
import { IDLE, BUSY } from "constants/button";
import Button from "components/Button";
import AnimatedBalls from "components/AnimatedBalls";
import LottieReactSubject from "observables/LottieReactSubject";
import { createNewBallSet } from "utils/ball";
import "./App.css";

const INITIAL_BALLS = createNewBallSet();

function App() {
  const [ballsText, setBallsText] = useState(INITIAL_BALLS.join(","));
  const [btnState, setBtnState] = useState(IDLE);

  const handleAnimationStop = useCallback(() => {
    setBtnState(IDLE);
  }, []);

  const handleAnimationStart = useCallback(() => {
    if (btnState === BUSY) return;

    const nextBalls = createNewBallSet();
    LottieReactSubject.next(nextBalls);
    setBtnState(BUSY);
    setBallsText(nextBalls.join(","));
  }, [btnState]);

  return (
    <div className="App">
      <header className="App-header">
        <p>React lottie web animation demo</p>
        <p>current ball sequence: {ballsText}</p>
        <AnimatedBalls
          initialBalls={INITIAL_BALLS}
          onAnimationStop={handleAnimationStop}
        />

        <Button state={btnState} onAnimationStart={handleAnimationStart} />
      </header>
    </div>
  );
}

export default App;
