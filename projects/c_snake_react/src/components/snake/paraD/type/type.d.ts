export interface Position {
  x: number;
  y: number;
}

export interface KeysPressed {
  key1: boolean;
  key2: boolean;
  enable: boolean;
}

// snake's properties that change.
export interface SnakeBase {
  position: Position;
  velocity: number;
  rotation: number;
  keys: KeysPressed;
}

export interface SnakeProps {
  position: Position;
  radio: number;
  color: string;
  velocity: number;
  rotation: number;
  transparency: number;
  isDeath: boolean;
  keys: KeysPressed;
}

//Context
export interface ctx {
  ctx: CanvasRenderingContext2D;
}

//

export interface ContenedorPrincipalProps {
  width: number;
  height: number;
  color: string;
}

//Background
export interface DrawBackground {
  width: number;
  height: number;
  color: string;
  ctx: CanvasRenderingContext2D;
}

//Cabeza
//Circle
export interface Circle extends ctx {
  position: Position;
  radio: number;
  transparency: number;
  color: string;
  shadowColor: string;
}

export interface EyeCommonProperties {
  position: Position;
  radio: number;

  desp_sclera: EyesDesp;
  desp_iris: EyesDesp;
  desp_pupil: EyesDesp;

  scleraColor: string;
  irisColor: string;
  pupilColor: string;

  scleraShadowColor: string;
  irisShadowColor: string;
  pupilShadowColor: string;

  scleraTransparency: number;
  irisTransparency: number;
  pupilTransparency: number;
}

export interface DrawHead extends Circle {
  count: number;
  eyeOne: EyeCommonProperties;
  eyeTwo: EyeCommonProperties;
}

// useSnakeBody
export type drawHead = ({
  position, //headPosition
  radio, //headRadio
  transparency, //headTransparency
  color,
  shadowColor, //headShadowColor
  ctx,
}: DrawHead) => void;

export interface SnakeHeadProps extends ctx {
  position: Position;
  count: number;
  keys: KeysPressed;
  rotation: number;
  snakeBase: SnakeBase;
  drawHead: drawHead;
  handleRotation: HandleRotation;
  handleSnakeBaseValues: HandleSnakeBaseValues;
}

export type HandleRotation = ({ rotationValue }: handleRotation) => void;
export type HandleSnakeBaseValues = ({ newSnakeBase }: SnakeBase) => void;

export interface handleRotation {
  rotationValue: number;
}

export interface DrawEye extends ctx, EyeCommonProperties {}

export interface EyesDesp {
  desp_x: number;
  desp_y: number;
  radio: number;
}

// Update
export interface Update extends ctx {
  width: number;
  height: number;
}

//useBakground(drawBackground, fillColor, width, height)
export interface SnakeBackgroundProps {
  drawBackground: drawBackground;
  drawHead: drawHead;
  width: number;
  height: number;
  color: string;
}

export type drawBackground = ({
  width,
  height,
  color,
  ctx,
}: DrawBackground) => void;

/*
export interface Draw {
  // draw: (ctx: CanvasRenderingContext2D, count: number) => void;
  draw: draw;
}

export interface CanvasEj_aaProps extends Draw {
  width: number;
  height: number;
}

export type draw = (ctx: CanvasRenderingContext2D, count: number) => void;
*/
