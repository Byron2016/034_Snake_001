import { useRef, useEffect } from "react";

// types
import type { CanvasEj_aaProps } from "../types";

// hooks
import useCanvas from "./hooks/useCanvas";

function CanvasEj_aa(props: CanvasEj_aaProps) {
  //https://www.youtube.com/watch?v=tev71VzEJos
  const { draw, ...rest } = props;

  const canvasRef = useCanvas(draw);

  return (
    <>
      <canvas ref={canvasRef} {...rest} />
    </>
  );
}

export default CanvasEj_aa;

// ANTES DEL useCanvas
// import { useRef, useEffect } from "react";

// // types
// import type { CanvasEj_aaProps } from "../types";

// // hooks
// import useCanvas from "./hooks/useCanvas";

// function CanvasEj_aa(props: CanvasEj_aaProps) {
//   const { draw, ...rest } = props;

//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   // const draw = (ctx: CanvasRenderingContext2D, count: number) => {
//   //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//   //   ctx.fillStyle = "blue";

//   //   const delta = count % 800;
//   //   ctx?.fillRect(10 + delta, 10, 100, 100);
//   // };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     // si no hay canvas retorna, no hace más.
//     if (!canvas) return;
//     const ctx = canvas?.getContext("2d");
//     // si no hay canvas retorna, no hace más.
//     if (!ctx) return;
//     //draw(ctx);

//     let count = 0;
//     let animationID: number;
//     function render() {
//       count++;
//       draw(ctx!, count);
//       animationID = requestAnimationFrame(render);
//     }
//     render();

//     return () => {
//       cancelAnimationFrame(animationID);
//     };
//   }, [draw]);

//   return (
//     <>
//       <canvas ref={canvasRef} {...rest} />
//     </>
//   );
// }
