export interface Draw {
  // draw: (ctx: CanvasRenderingContext2D, count: number) => void;
  draw: draw;
}

export interface CanvasEj_aaProps extends Draw {
  width: number;
  height: number;
}

export type draw = (ctx: CanvasRenderingContext2D, count: number) => void;
