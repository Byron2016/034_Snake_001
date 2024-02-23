import drawRectangle from './drawRectangle'

function drawDoubleRectangle({
  position,
  outSideRectangleSide,
  inSideRectangleSide,
  outSideRectangleColor,
  inSideRectangleColor,
  transparency,
  rectLineWidth,
  ctx,
}) {
  // outside Rectangle

  drawRectangle({
    position,
    rectangleSide_a: outSideRectangleSide,
    rectangleSide_b: outSideRectangleSide,
    fillColor: outSideRectangleColor,
    lineColor: outSideRectangleColor,
    transparency,
    rectLineWidth,
    ctx,
  })

  drawRectangle({
    position,
    rectangleSide_a: inSideRectangleSide,
    rectangleSide_b: inSideRectangleSide,
    fillColor: inSideRectangleColor,
    lineColor: inSideRectangleColor,
    transparency,
    rectLineWidth,
    ctx,
  })
}

export default drawDoubleRectangle
