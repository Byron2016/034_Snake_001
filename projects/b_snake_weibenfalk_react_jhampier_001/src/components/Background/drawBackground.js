// constants
import {
  CANVAS_SIZE,
  COLOR_BACKGROUND,
  DRAW_BACKGROUND,
} from '../../constants/constants'

export function drawBackground({ color, ctx }) {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1])
  for (
    let i = 0;
    i < CANVAS_SIZE[1];
    i += DRAW_BACKGROUND.NUMBER_CANVAS_TO_DIV[0]
  ) {
    for (
      let j = 0;
      j < CANVAS_SIZE[0];
      j += DRAW_BACKGROUND.NUMBER_CANVAS_TO_DIV[1]
    ) {
      ctx.fillStyle = COLOR_BACKGROUND[1]
      ctx.fillRect(
        j + DRAW_BACKGROUND.MARGINS[0],
        i + DRAW_BACKGROUND.MARGINS[1],
        DRAW_BACKGROUND.INTERNAL_REC_DIM[0],
        DRAW_BACKGROUND.INTERNAL_REC_DIM[1],
      )
    }
  }
}

export default drawBackground
