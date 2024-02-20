const CANVAS_SIZE = [800, 800]
const SNAKE_START = [
  [8, 10],
  [7, 10]
]
const APPLE_START = [8, 3]
const SCALE = 40
const SPEED = 300
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
}

const COLOR_BACKGROUND = ["#1B1C30","#23253C"]
const DRAW_BACKGROUND = {
  MARGINS: [5,5],
  INTERNAL_REC_DIM: [70,70],
  NUMBER_CANVAS_TO_DIV: [80,80]
}

export {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
  COLOR_BACKGROUND,
  DRAW_BACKGROUND
}
