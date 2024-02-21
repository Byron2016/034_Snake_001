// Utils
import drawCircle from '../utils/drawCircle'

// constants
import { DRAW_EYE_01, DRAW_EYE_02 } from '../../constants/eyes_constants'
import { DIRECTIONS } from '../../constants/constants'

export function EyesToDraw({ eye_one_position, eye_two_position, ctx, dir }) {
  drawEye({ position: eye_one_position, eye_properties: DRAW_EYE_01, ctx, dir })

  drawEye({ position: eye_two_position, eye_properties: DRAW_EYE_02, ctx, dir })
}

function drawEye({ position, eye_properties, ctx, dir }) {
  let eye_prop = { ...eye_properties }

  if (dir[0] === DIRECTIONS[38][0] && dir[1] === DIRECTIONS[38][1]) {
    // UP
    //console.log(`inside direc[38]`)

    eye_prop.EYE_SCLERA_DESP = {
      ...eye_prop.EYE_DESP_DIR.DIR_UP.EYE_SCLERA_DESP,
    }
    eye_prop.EYE_IRIS_DESP = { ...eye_prop.EYE_DESP_DIR.DIR_UP.EYE_IRIS_DESP }
    eye_prop.EYE_PUPIL_DESP = { ...eye_prop.EYE_DESP_DIR.DIR_UP.EYE_PUPIL_DESP }
  } else if (dir[0] === DIRECTIONS[40][0] && dir[1] === DIRECTIONS[40][1]) {
    // DOWN
    //console.log(`inside direc[40]`)

    eye_prop.EYE_SCLERA_DESP = {
      ...eye_prop.EYE_DESP_DIR.DIR_DOWN.EYE_SCLERA_DESP,
    }
    eye_prop.EYE_IRIS_DESP = { ...eye_prop.EYE_DESP_DIR.DIR_DOWN.EYE_IRIS_DESP }
    eye_prop.EYE_PUPIL_DESP = {
      ...eye_prop.EYE_DESP_DIR.DIR_DOWN.EYE_PUPIL_DESP,
    }
  } else if (dir[0] === DIRECTIONS[37][0] && dir[1] === DIRECTIONS[37][1]) {
    // LEFT
    //console.log(`inside direc[37]`)

    eye_prop.EYE_SCLERA_DESP = {
      ...eye_prop.EYE_DESP_DIR.DIR_LEFT.EYE_SCLERA_DESP,
    }
    eye_prop.EYE_IRIS_DESP = { ...eye_prop.EYE_DESP_DIR.DIR_LEFT.EYE_IRIS_DESP }
    eye_prop.EYE_PUPIL_DESP = {
      ...eye_prop.EYE_DESP_DIR.DIR_LEFT.EYE_PUPIL_DESP,
    }
  } else if (dir[0] === DIRECTIONS[39][0] && dir[1] === DIRECTIONS[39][1]) {
    // RIGHT
    //console.log(`entro direc[39]`)

    eye_prop.EYE_SCLERA_DESP = {
      ...eye_prop.EYE_DESP_DIR.DIR_RIGHT.EYE_SCLERA_DESP,
    }
    eye_prop.EYE_IRIS_DESP = {
      ...eye_prop.EYE_DESP_DIR.DIR_RIGHT.EYE_IRIS_DESP,
    }
    eye_prop.EYE_PUPIL_DESP = {
      ...eye_prop.EYE_DESP_DIR.DIR_RIGHT.EYE_PUPIL_DESP,
    }
  } else {
    console.log(
      `There are a problem with eyes asignacion with concordanse with snake direction.`,
    )
    return
  }

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

  //Iris
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

  //Pupil
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
  ctx,
}) {
  const newPosition = {
    x: position.x + position_offset[0],
    y: position.y + position_offset[1],
  }

  const newRadio = radio + position_offset[2]

  drawCircle({
    position: newPosition,
    radio: newRadio,
    color,
    ctx,
    transparency,
    shadowBlur,
    shadowColor,
  })
}
