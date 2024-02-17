import { useRef, useEffect, useState } from "react";

// types
import type { SnakeBackgroundProps, KeysPressed } from "../type/type";

// Utils
import { SnakeHeadNew } from "../utils/SnakeHeadNew";
//import { drawHead } from "../utils/drawHead"; //1

export function useSnake({
  drawBackground,
  drawHead,
  width,
  height,
  color,
}: SnakeBackgroundProps) {
  const [laRotation, setLaRotation] = useState<number>(0);

  const refCanvas = useRef<HTMLCanvasElement | null>(null);
  //let ctx: CanvasRenderingContext2D | null;

  const handleRotation = ({ newRotation }: { newRotation: number }) => {
    setLaRotation(newRotation);
    console.log(
      `Rotacion en handleRotation: oldRotation: ${laRotation} newRotation: ${newRotation}`
    );
  };

  // useEffect(() => {
  //   console.log("useEffect 1 SE EJECUTÓ");

  // }, []);

  useEffect(() => {
    console.log("useEffect 2 SE EJECUTÓ");

    const canvas = refCanvas.current! as HTMLCanvasElement;
    if (!canvas) return;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    //if (!ctx) return;
    if (!ctx || !(ctx instanceof CanvasRenderingContext2D)) {
      //throw new Error('Failed to get 2D context');
      return;
    }

    canvas.width = width;
    canvas.height = height;

    //eventos
    //#region eventos

    const keys: KeysPressed = { key1: false, key2: false, enable: true };

    //eventos key down
    const handlekeyDown = (evt) => {
      if (evt.key == "a" || evt.key == "A") {
        //console.log("key pressed");
        // const newSnake: SnakeProps = { ...snake };
        keys.key1 = true;
      }

      if (evt.key == "d" || evt.key == "D") {
        //console.log("key pressed");
        // const newSnake: SnakeProps = { ...snake };
        keys.key2 = true;
      }
    };

    //eventos key up
    const handlekeyUP = (evt) => {
      if (evt.key == "a" || evt.key == "A") {
        //console.log("key unpressed");
        // const newSnake: SnakeProps = { ...snake };
        keys.key1 = false;
      }

      if (evt.key == "d" || evt.key == "D") {
        //console.log("key unpressed");
        // const newSnake: SnakeProps = { ...snake };
        keys.key2 = false;
      }
    };

    // crear listeners
    document.addEventListener("keydown", handlekeyDown);
    document.addEventListener("keyup", handlekeyUP);
    //#endregion eventos

    //let rotation = 0;
    let count = 0;
    let animationID: number;
    function render() {
      drawBackground({
        width,
        height,
        color,
        ctx,
      });

      const position = { x: 200, y: 200 };
      count++;
      //rotation++;

      SnakeHeadNew({
        drawHead,
        position,
        ctx,
        count,
        keys,
        rotation: laRotation,
        handleRotation,
      });

      animationID = requestAnimationFrame(render);
    }

    render();

    return () => {
      // destruír listeners
      document.removeEventListener("keydown", handlekeyDown);
      document.removeEventListener("keyup", handlekeyUP);

      cancelAnimationFrame(animationID);
    };
  }, [drawBackground, drawHead]);

  return refCanvas;
}
