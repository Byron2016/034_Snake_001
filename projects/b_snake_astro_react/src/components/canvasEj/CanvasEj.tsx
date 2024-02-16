import CanvasEj_aa from "./canvasEj_aa/CanvasEj_aa";

// types
import type { CanvasEj_aaProps } from "./types";

function CanvasEj() {
  const draw = (ctx: CanvasRenderingContext2D, count: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "blue";

    const delta = count % 800;
    ctx?.fillRect(10 + delta, 10, 100, 100);
  };

  const canvasEj_aa: CanvasEj_aaProps = {
    draw: draw,
    width: 400,
    height: 400,
  };

  return (
    <>
      <CanvasEj_aa {...canvasEj_aa} />
    </>
  );
}

export default CanvasEj;
