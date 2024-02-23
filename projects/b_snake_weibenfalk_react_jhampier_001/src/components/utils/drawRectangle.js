function drawRectangle({
  position,
  rectangleSide_a,
  rectangleSide_b,
  fillColor,
  lineColor,
  transparency,
  rectLineWidth,
  ctx,
}) {
  ctx.save()
  ctx.beginPath()
  ctx.lineWidth = rectLineWidth
  ctx.strokeStyle = lineColor
  ctx.rect(position.x, position.y, rectangleSide_a, rectangleSide_b)
  ctx.fillStyle = fillColor
  ctx.globalAlpha = transparency
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}

export default drawRectangle
