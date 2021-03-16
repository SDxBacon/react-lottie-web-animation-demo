import React, { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import clamp from "lodash/clamp";
import inRange from "lodash/inRange";
import {
  DELAY_FACTOR,
  SIZE_OF_BALLS,
  LOTTIE_MAX_SPINNING_SPEED,
  LOTTIE_MIN_SPINNING_SPEED,
  DURATION_SPINNING,
  DURATION_SLOW_DOWN,
  OVERTIME_TOLERANCE
} from "constants/config";
import {
  getPausedStartFrame,
  getFrameByBallNum,
  playSpeedInterpolate
} from "utils/math";
import animationData from "lottie/animateData";
import LottieReactSubject from "observables/LottieReactSubject";
import { Wrapper } from "./Styled";

function AnimatedBall({ ballIndex, initialBall, onFinished }) {
  const delay = DELAY_FACTOR * ballIndex;
  const lottieRef = useRef();
  const requestIdRef = useRef();

  /**
   * 執行滾動彩球特效
   */
  useEffect(() => {
    const subscribe = LottieReactSubject.subscribe({
      next: (nextBalls) => {
        const ball = nextBalls[ballIndex];
        const frame = getFrameByBallNum(ball);

        // 預防先前還有動畫再轉, 先cancel掉
        cancelAnimationFrame(requestIdRef.current);

        // 開始進入滾球動畫
        setTimeout(() => {
          lottieRef.current.setSpeed(LOTTIE_MAX_SPINNING_SPEED);
          lottieRef.current.play();

          // 建立timer, 逐漸減速並進入轉停階段
          setTimeout(() => {
            const tStart = performance.now(); // get start time before pausing
            const to = frame;
            const from = getPausedStartFrame(to);

            lottieRef.current.goToAndPlay(from, true);

            requestIdRef.current = requestAnimationFrame(function animate(now) {
              const timeDiff = now - tStart;
              const frameDiff =
                lottieRef.current?.animationItem.currentFrame - to;
              const control = clamp(timeDiff / DURATION_SLOW_DOWN, 0, 1);
              const nextSpeed = playSpeedInterpolate(
                LOTTIE_MAX_SPINNING_SPEED,
                LOTTIE_MIN_SPINNING_SPEED,
                control
              );
              const isOvertime =
                now > tStart + DURATION_SLOW_DOWN + OVERTIME_TOLERANCE;

              /**
               * 當lottie已播放的幀數超過目標影格, 或者觸發此callback時間超時,
               * 直接將動畫跳轉至目標影格並停止lottie播放
               */
              if (inRange(frameDiff, 0, 1) || isOvertime) {
                lottieRef.current.goToAndStop(to, true);
                if (ballIndex === SIZE_OF_BALLS - 1) {
                  onFinished();
                }
                return;
              }

              lottieRef.current.setSpeed(Math.abs(nextSpeed));
              requestIdRef.current = requestAnimationFrame(animate);
            });
          }, DURATION_SPINNING);
        }, delay);
      }
    });

    return () => {
      cancelAnimationFrame(requestIdRef.current);
      subscribe.unsubscribe();
    };
  }, [delay, ballIndex, onFinished]);

  /**
   * 此effect只執行在mount起來時,
   * 用意是將Lottie停住，並直接顯示當下球號
   */
  useEffect(() => {
    const frame = getFrameByBallNum(initialBall);
    lottieRef.current.goToAndStop(frame, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Lottie
        style={{
          width: "50px",
          height: "50px"
        }}
        lottieRef={lottieRef}
        animationData={animationData}
      />
    </Wrapper>
  );
}

export default AnimatedBall;
