// types
import type { DrawBackground } from "../type/type";

function drawBackground({ width, height, color, ctx }: DrawBackground) {
  if (!ctx) {
    //console.log("No context");
    return;
  }
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < height; i += 80) {
    for (let j = 0; j < width; j += 80) {
      ctx.fillStyle = "#23253C";
      ctx.fillRect(j + 10, i + 10, 70, 70);
    }
  }
}

export default drawBackground;
