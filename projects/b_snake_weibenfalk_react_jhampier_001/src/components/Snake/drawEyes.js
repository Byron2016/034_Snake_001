// Utils
import drawCircle from "../utils/drawCircle";

// constants
import {
  DRAW_EYE_01,
  DRAW_EYE_02,
} from '../../constants/eyes_constants'

export function EyesToDraw({
  eye_one_position, 
  eye_two_position,
  ctx,
}){

  drawEye({position:eye_one_position,eye_properties:DRAW_EYE_01,ctx})

  drawEye({position:eye_two_position,eye_properties:DRAW_EYE_02,ctx})
}

function drawEye({
  position, 
  eye_properties,
  ctx,
}) {

  const eye_prop = {...eye_properties};
  //Sclera
  drawEyeSection({
    position,
    radio: eye_prop.EYE_RADIO,
    position_offset: eye_prop.EYE_SCLERA_DESP,
    color: eye_prop.EYE_SCLERA_COLOR,
    transparency: eye_prop.EYE_SCLERA_TRANSPARENCY,
    shadowColor: eye_prop.EYE_SCLERA_SHADOW_COLOR,
    shadowBlur: eye_prop.EYE_SCLERA_SHADOW_BLUR,
    ctx,
  })
  
//  //Iris
 drawEyeSection({
  position,
  radio: eye_prop.EYE_RADIO,
  position_offset: eye_prop.EYE_IRIS_DESP,
  color: eye_prop.EYE_IRIS_COLOR,
  transparency: eye_prop.EYE_IRIS_TRANSPARENCY,
  shadowColor: eye_prop.EYE_IRIS_SHADOW_COLOR,
  shadowBlur: eye_prop.EYE_IRIS_SHADOW_BLUR,
  ctx,
})

//   //Pupil
  drawEyeSection({
    position,
    radio: eye_prop.EYE_RADIO,
    position_offset: eye_prop.EYE_PUPIL_DESP,
    color: eye_prop.EYE_PUPIL_COLOR,
    transparency: eye_prop.EYE_PUPIL_TRANSPARENCY,
    shadowColor: eye_prop.EYE_PUPIL_SHADOW_COLOR,
    shadowBlur: eye_prop.EYE_PUPIL_SHADOW_BLUR,
    ctx,
  })
}

function drawEyeSection({
  position, 
  radio, 
  position_offset,
  color,
  shadowColor,
  shadowBlur,
  transparency,
  ctx
}){
  const newPosition = {
    x: position.x + position_offset[0],
    y: position.y + position_offset[1],
  };

  const newRadio = radio + position_offset[2];

  drawCircle({
    position: newPosition,
    radio: newRadio,
    color,
    ctx,
    transparency,
    shadowBlur,
    shadowColor,
  });
}


