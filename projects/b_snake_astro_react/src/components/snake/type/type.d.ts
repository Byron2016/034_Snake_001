interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface Position {
  x: number;
  y: number;
}

interface KeysPressed {
  key1: boolean;
  key2: boolean;
  enable: boolean;
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

export interface DrawCircleProps {
  x: number;
  y: number;
  radio: number;
  color: string;
  transparency: number;
  shadowColor: string;
  ctx: CanvasRenderingContext2D;
}

export interface drawEyesProps {
  desp_x_sclera: number;
  desp_y_sclera: number;
  radio_sclera: number;
  desp_x_iris: number;
  desp_y_iris: number;
  radio_iris: number;
  desp_x_pupil: number;
  desp_y_pupil: number;
  radio_pupil: number;
  ctx: CanvasRenderingContext2D;
  transparency: number;
}
