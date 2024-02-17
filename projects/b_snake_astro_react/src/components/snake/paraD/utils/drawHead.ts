import drawCircle from "./drawCircle";

// types
import type { DrawHead, DrawEye, EyesDesp, Position } from "../type/type";

// eyeOne,
// eyeTwo,

export function drawHead({
  position, //headPosition
  radio, //headRadio
  transparency, //headTransparency
  color, //headColor
  shadowColor, //headShadowColor
  ctx,
  count,
  eyeOne,
  eyeTwo,
}: DrawHead) {
  drawCircle({
    position,
    radio,
    color,
    transparency,
    shadowColor,
    ctx,
  });

  drawEye({ ...eyeOne, ctx });
  drawEye({ ...eyeTwo, ctx });
}

// Eye
function drawEye({
  position, //headPosition
  radio, //headRadio

  desp_sclera,
  desp_iris,
  desp_pupil,

  scleraColor,
  irisColor,
  pupilColor,

  scleraShadowColor,
  irisShadowColor,
  pupilShadowColor,

  scleraTransparency,
  irisTransparency,
  pupilTransparency,

  ctx,
}: DrawEye) {
  const x = position.x;
  const y = position.y;

  //Sclera
  const positionSclera = {
    x: x + desp_sclera.desp_x,
    y: y + desp_sclera.desp_y,
  };
  drawCircle({
    position: positionSclera,
    radio: radio + desp_sclera.radio,
    color: scleraColor,
    ctx,
    transparency: scleraTransparency,
    shadowColor: scleraShadowColor,
  });

  //Iris
  const positionIris = {
    x: x + desp_iris.desp_x,
    y: y + desp_iris.desp_y,
  };
  drawCircle({
    position: positionIris,
    radio: radio + desp_iris.radio,
    color: irisColor,
    ctx,
    transparency: irisTransparency,
    shadowColor: irisShadowColor,
  });

  //Pupil
  const positionPupil = {
    x: x + desp_pupil.desp_x,
    y: y + desp_pupil.desp_y,
  };
  drawCircle({
    position: positionPupil,
    radio: radio + desp_pupil.radio,
    color: pupilColor,
    ctx,
    transparency: pupilTransparency,
    shadowColor: pupilShadowColor,
  });
}
