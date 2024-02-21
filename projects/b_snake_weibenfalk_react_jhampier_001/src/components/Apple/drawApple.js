// Utils
import drawCircle from '../utils/drawCircle'

// constants
import { DRAW_APPLE } from '../../constants/apple_constants'

export function drawApple({ position, ctx }) {
  const radio = DRAW_APPLE.APPLE_RADIO
  const color = DRAW_APPLE.APPLE_COLOR
  const shadowColor = DRAW_APPLE.APPLE_SHADOW_COLOR
  const transparency = DRAW_APPLE.APPLE_TRANSPARENCY
  const shadowBlur = DRAW_APPLE.APPLE_SHADOW_BLUR
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
