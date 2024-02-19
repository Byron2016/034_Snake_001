
// Utils
import drawCircle from "../utils/drawCircle";

// constants
import {
  DRAW_HEAD
} from '../../constants/constants'

export function drawHead({
  position, //headPosition
  ctx,

}) {
  const radio = DRAW_HEAD.HEAD_RADIO;
  const color = DRAW_HEAD.HEAD_COLOR;
  const shadowColor = DRAW_HEAD.HEAD_SHADOW_COLOR;
  const transparency = DRAW_HEAD.HEAD_TRANSPARENCY
  drawCircle({
    position,
    radio,
    color,
    transparency,
    shadowColor,
    ctx,
  });

}