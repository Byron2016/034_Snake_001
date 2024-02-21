//const DRAW_EYES = {}

const DRAW_EYE_01 = {
  EYE_POSITION: [8, 10],
  EYE_RADIO: 1.5,

  // Note: x, y, radio
  EYE_SCLERA_DESP: [0, 0, 0],
  EYE_IRIS_DESP: [0, 0, 0],
  EYE_PUPIL_DESP: [0, 0, 0],

  EYE_DESP_DIR: {
    DIR_UP: {
      EYE_SCLERA_DESP: [-0.5, 0, -1.2],
      EYE_IRIS_DESP: [-0.5, 0.01, -1.25],
      EYE_PUPIL_DESP: [-0.5, -0.15, -1.42],
    },
    DIR_DOWN: {
      EYE_SCLERA_DESP: [-0.5, 0, -1.2],
      EYE_IRIS_DESP: [-0.5, 0.08, -1.25],
      EYE_PUPIL_DESP: [-0.5, 0.15, -1.42],
    },
    DIR_LEFT: {
      EYE_SCLERA_DESP: [0, -0.5, -1.2],
      EYE_IRIS_DESP: [-0.02, -0.5, -1.25],
      EYE_PUPIL_DESP: [-0.15, -0.5, -1.42],
    },
    DIR_RIGHT: {
      EYE_SCLERA_DESP: [0, -0.5, -1.2],
      EYE_IRIS_DESP: [0.08, -0.5, -1.25],
      EYE_PUPIL_DESP: [0.15, -0.5, -1.42],
    },
  },

  // #region eye1
  EYE_SCLERA_COLOR: 'white',
  EYE_IRIS_COLOR: 'black',
  EYE_PUPIL_COLOR: 'white',

  EYE_SCLERA_SHADOW_COLOR: 'transparent',
  EYE_IRIS_SHADOW_COLOR: 'transparent',
  EYE_PUPIL_SHADOW_COLOR: 'transparent',

  EYE_SCLERA_SHADOW_BLUR: 25,
  EYE_IRIS_SHADOW_BLUR: 25,
  EYE_PUPIL_SHADOW_BLUR: 25,

  EYE_SCLERA_TRANSPARENCY: 1,
  EYE_IRIS_TRANSPARENCY: 1,
  EYE_PUPIL_TRANSPARENCY: 1,
  // #endregion eye1
}

const DRAW_EYE_02 = {
  EYE_POSITION: [8, 10],
  EYE_RADIO: 1.5,

  // Note: x, y, radio
  EYE_SCLERA_DESP: [0, 0, 0],
  EYE_IRIS_DESP: [0, 0, 0],
  EYE_PUPIL_DESP: [0, 0, 0],

  EYE_DESP_DIR: {
    DIR_UP: {
      EYE_SCLERA_DESP: [0.5, 0, -1.2],
      EYE_IRIS_DESP: [0.5, 0.01, -1.25],
      EYE_PUPIL_DESP: [0.5, -0.15, -1.42],
    },
    DIR_DOWN: {
      EYE_SCLERA_DESP: [0.5, 0, -1.2],
      EYE_IRIS_DESP: [0.5, 0.08, -1.25],
      EYE_PUPIL_DESP: [0.5, 0.15, -1.42],
    },
    DIR_LEFT: {
      EYE_SCLERA_DESP: [0, 0.5, -1.2],
      EYE_IRIS_DESP: [-0.02, 0.5, -1.25],
      EYE_PUPIL_DESP: [-0.15, 0.5, -1.42],
    },
    DIR_RIGHT: {
      EYE_SCLERA_DESP: [0, 0.5, -1.2],
      EYE_IRIS_DESP: [0.08, 0.5, -1.25],
      EYE_PUPIL_DESP: [0.15, 0.5, -1.42],
    },
  },

  // #region eye2
  EYE_SCLERA_COLOR: 'white',
  EYE_IRIS_COLOR: 'black',
  EYE_PUPIL_COLOR: 'white',

  EYE_SCLERA_SHADOW_COLOR: 'transparent',
  EYE_IRIS_SHADOW_COLOR: 'transparent',
  EYE_PUPIL_SHADOW_COLOR: 'transparent',

  EYE_SCLERA_SHADOW_BLUR: 25,
  EYE_IRIS_SHADOW_BLUR: 25,
  EYE_PUPIL_SHADOW_BLUR: 25,

  EYE_SCLERA_TRANSPARENCY: 1,
  EYE_IRIS_TRANSPARENCY: 1,
  EYE_PUPIL_TRANSPARENCY: 1,
  // #endregion eye
}

export { DRAW_EYE_01, DRAW_EYE_02 }
