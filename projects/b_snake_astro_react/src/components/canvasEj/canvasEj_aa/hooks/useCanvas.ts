import { useRef, useEffect } from "react";

// types
import type { draw } from "../../types";
//draw: (ctx: CanvasRenderingContext2D, count: number) => void
function useCanvas(draw: draw) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // si no hay canvas retorna, no hace más.
    if (!canvas) return;
    const ctx = canvas?.getContext("2d");
    // si no hay canvas retorna, no hace más.
    if (!ctx) return;
    //draw(ctx);

    let count = 0;
    let animationID: number;
    function render() {
      count++;
      draw(ctx!, count);
      animationID = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(animationID);
    };
  }, [draw]);

  return canvasRef;
}

export default useCanvas;
