import { useRef, useEffect, useContext } from "react";

// types
import type {
  SnakeBackgroundProps,
  SnakeBase,
  SnakeBaseContextType,
} from "../type/type";

// constants
//import { SNAKE_BASE_PROPERTIES } from "../constants/constants";

// Utils
import { SnakeHeadNew } from "../utils/SnakeHeadNew";

// context
import { SnakeContext } from "../context/snakeFilters";

export function useSnake({
  drawBackground,
  drawHead,
  width,
  height,
  color,
}: SnakeBackgroundProps) {
  // const [snakeBase, setSnakeBase] = useState<SnakeBase>({
  //   position: SNAKE_BASE_PROPERTIES.SNAKE_POSITION,
  //   velocity: SNAKE_BASE_PROPERTIES.SNAKE_VELOCITY,
  //   radio: SNAKE_BASE_PROPERTIES.SNAKE_HEAD_RADIO,
  //   rotation: SNAKE_BASE_PROPERTIES.SNAKE_INITIAL_ROTATION,
  //   allowTraslation: SNAKE_BASE_PROPERTIES.SNAKE_IS_TRASLATE,
  //   keys: { key1: false, key2: false, enable: true },
  // });

  const refCanvas = useRef<HTMLCanvasElement | null>(null);

  const { asnakeBase, saveSnakeBase } = useContext(
    SnakeContext
  ) as SnakeBaseContextType;

  //console.log(`useSnake - asnakeBase: ${JSON.stringify(asnakeBase)}`);

  // if (!asnakeBase) {
  //   return;
  // }

  const snakeBase = { ...asnakeBase };

  const handleSnakeBaseValues = (newSnakeBase: SnakeBase) => {
    //setSnakeBase(newSnakeBase);
    //saveSnakeBase(newSnakeBase);
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

      count++;

      SnakeHeadNew({
        count,
        ctx,
        snakeBase,
        drawHead,
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
