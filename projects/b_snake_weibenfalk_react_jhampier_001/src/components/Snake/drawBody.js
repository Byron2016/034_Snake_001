// Utils
import drawCircle from '../utils/drawCircle'

// constants
import { DRAW_BODY } from '../../constants/body_constants'

export function drawBody({
  position, //headPosition
  ctx,
}) {
  const radio = DRAW_BODY.BODY_RADIO
  const color = DRAW_BODY.BODY_COLOR
  const shadowColor = DRAW_BODY.BODY_SHADOW_COLOR
  const transparency = DRAW_BODY.BODY_TRANSPARENCY
  const shadowBlur = DRAW_BODY.BODY_SHADOW_BLUR
  drawCircle({
    position,
    radio,
    color,
    transparency,
    shadowColor,
    shadowBlur,
    ctx,
  })
}
