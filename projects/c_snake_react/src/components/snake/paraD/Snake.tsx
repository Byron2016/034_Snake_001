// types
import type { SnakeBackgroundProps } from "./type/type";

// Hooks
import { useSnake } from "./hooks/useSnake";

const Snake = ({
  drawBackground,
  drawHead,
  width,
  height,
  color,
}: SnakeBackgroundProps) => {
  //let refCanvas = useBakground({drawBackground, width, height, color,}: SnakeBackgroundProps);

  const refCanvas = useSnake({
    drawBackground,
    drawHead,
    width,
    height,
    color,
  });
  //refCanvas = useSnakeHead({ drawHead });

  return (
    <>
      <h1>hola</h1>
      <canvas ref={refCanvas}></canvas>
    </>
  );
};

export default Snake;
