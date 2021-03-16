import { easePolyOut } from "d3-ease";
import {
  FRAME_OFFSET,
  NUM_PAUSING_FROM,
  SIZE_OF_BALLS
} from "constants/config";

const easingFn = easePolyOut.exponent(4.5);

/** very simple linear interpolate helper */
function linearInterpolate(a, b, n) {
  return (1 - n) * a + n * b;
}

/** lottie 播放速度 interpolate helper */
export function playSpeedInterpolate(a, b, n) {
  return linearInterpolate(a, b, easingFn(n));
}

export const getFrameByBallNum = (ballNum) => {
  return (ballNum - 1) * FRAME_OFFSET;
};

export const getPausedStartFrame = (toFrame) => {
  const toBall = toFrame / FRAME_OFFSET + 1;
  const pausingStartBall =
    (toBall - NUM_PAUSING_FROM + SIZE_OF_BALLS) % SIZE_OF_BALLS;
  return getFrameByBallNum(pausingStartBall);
};
