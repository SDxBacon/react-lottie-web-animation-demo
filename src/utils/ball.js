import shuffle from "lodash/shuffle";
import range from "lodash/range";
import { SIZE_OF_BALLS } from "constants/config";

export const createNewBallSet = () => shuffle(range(1, SIZE_OF_BALLS + 1));
