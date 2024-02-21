function drawCircle({
  position,
  radio,
  color,
  transparency,
  shadowColor,
  shadowBlur,
  ctx,
}) {
  ctx.save()
  ctx.beginPath()
  ctx.arc(position.x, position.y, radio, 0, 2 * Math.PI)
  ctx.fillStyle = color
  ctx.globalAlpha = transparency
  ctx.shadowColor = shadowColor
  ctx.shadowBlur = shadowBlur
  ctx.fill()
  ctx.closePath()
  ctx.restore()
}

export default drawCircle
