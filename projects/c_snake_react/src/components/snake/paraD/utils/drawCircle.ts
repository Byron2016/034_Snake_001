// types
import type { Circle } from "../type/type";

function drawCircle({
  position,
  radio,
  color,
  ctx,
  transparency,
  shadowColor,
}: Circle) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(position.x, position.y, radio, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.globalAlpha = transparency;
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

export default drawCircle;
