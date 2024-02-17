import { useRef, useEffect, useState } from "react";

// types
import type {
  SnakeBackgroundProps,
  KeysPressed,
  handleRotation,
  SnakeBase,
} from "../type/type";

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
  const [snakeBase, setSnakeBase] = useState<SnakeBase>({
    position: { x: 100, y: 200 },
    velocity: 1.5,
    rotation: 0,
    keys: { key1: false, key2: false, enable: true },
  });

  const refCanvas = useRef<HTMLCanvasElement | null>(null);
  //let ctx: CanvasRenderingContext2D | null;

  const handleRotation = ({ rotationValue }: handleRotation) => {
    setLaRotation(rotationValue);
    //console.log(`Rotacion en handleRotation: oldRotation: ${laRotation} newRotation: ${rotationValue}`);
  };

  const handleSnakeBaseValues = (newSnakeBase: SnakeBase) => {
    setSnakeBase(newSnakeBase);
  };

  useEffect(() => {
    //console.log("useEffect 2 SE EJECUTÓ");

    const canvas = refCanvas.current! as HTMLCanvasElement;
    if (!canvas) return;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

    if (!ctx || !(ctx instanceof CanvasRenderingContext2D)) {
      //throw new Error('Failed to get 2D context');
      return;
    }

    canvas.width = width;
    canvas.height = height;

    //eventos
    //#region eventos

    const keys = { key1: false, key2: false, enable: true };
    //eventos key down
    const handlekeyDown = (evt: KeyboardEvent) => {
      const newSnakeBase = { ...snakeBase };
      if (evt.key == "a" || evt.key == "A") {
        //console.log("key pressed");
        newSnakeBase.keys.key1 = true;
      }

      if (evt.key == "d" || evt.key == "D") {
        //console.log("key pressed");
        newSnakeBase.keys.key2 = true;
      }
      handleSnakeBaseValues(newSnakeBase);
    };

    //eventos key up
    const handlekeyUP = (evt: KeyboardEvent) => {
      const newSnakeBase = { ...snakeBase };
      if (evt.key == "a" || evt.key == "A") {
        //console.log("key unpressed");
        newSnakeBase.keys.key1 = false;
      }

      if (evt.key == "d" || evt.key == "D") {
        //console.log("key unpressed");
        newSnakeBase.keys.key2 = false;
      }
      handleSnakeBaseValues(newSnakeBase);
    };

    //eventos crear listeners
    document.addEventListener("keydown", handlekeyDown);
    document.addEventListener("keyup", handlekeyUP);

    //#endregion eventos

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

      SnakeHeadNew({
        drawHead,
        position,
        ctx,
        count,
        keys,
        rotation: laRotation,
        snakeBase,
        handleRotation,
        handleSnakeBaseValues,
      });

      animationID = requestAnimationFrame(render);
    }

    render();

    return () => {
      //eventos  destruír listeners
      document.removeEventListener("keydown", handlekeyDown);
      document.removeEventListener("keyup", handlekeyUP);

      cancelAnimationFrame(animationID);
    };
  }, [handleSnakeBaseValues]);
  /*
  drawBackground,
    drawHead,
    width,
    height,
    color,
    handleRotation,
    snakeBase,
  */
  //React Hook useEffect has missing dependencies:
  //'color', 'handleRotation', 'height', 'laRotation', and 'width'.

  //React Hook useEffect has missing dependencies:
  //'handleRotation' and 'laRotation'.

  return refCanvas;
}
