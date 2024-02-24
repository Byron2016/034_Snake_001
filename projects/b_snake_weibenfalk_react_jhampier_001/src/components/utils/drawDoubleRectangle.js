import drawCircle from './drawCircle'
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

  const newPosition = {
    x: position.x + outSideRectangleSide,
    y: position.y,
  }

  drawCircle({
    position: newPosition,

    radio: 0.1,
    color: inSideRectangleColor,
    transparency,
    shadowColor: inSideRectangleColor,
    shadowBlur: transparency,
    ctx,
  })
}

export default drawDoubleRectangle
