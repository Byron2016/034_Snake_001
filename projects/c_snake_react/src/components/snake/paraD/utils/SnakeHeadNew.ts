// types
import type {
  SnakeHeadProps,
  EyeCommonProperties,
  EyesDesp,
  Position,
} from "../type/type";

// constants
import { SNAKE_HEAD_PROPERTIES } from "../constants/constants";

export function SnakeHeadNew({
  drawHead,
  ctx,
  count,
  snakeBase,
  handleSnakeBaseValues,
}: SnakeHeadProps) {
  function draw(ctx: CanvasRenderingContext2D, rotation: number) {
    //const delta = count % 800;
    //const newPosition = { x: position.x + delta, y: position.y };

    //position = { x: position.x + delta, y: position.y };

    //console.log(`draw - newPosition: ${position.x} - ${position.y}`);

    // snakes' translations.
    const newPosition: Position = {
      x: snakeBase.position.x + Math.cos(rotation) * snakeBase.velocity,
      y: snakeBase.position.y + Math.sin(rotation) * snakeBase.velocity,
    };

    const newSnakeBase = { ...snakeBase };
    newSnakeBase.position = newPosition;
    handleSnakeBaseValues(newSnakeBase);

    //console.log(`draw - newPosition: ${position.x} - ${position.y} -- rotation: ${rotation}`);

    //#region Eyes
    //#region Eye-des-vars
    let desp_sclera: EyesDesp = {
      desp_x: 0,
      desp_y: -9,
      radio: -4,
    };
    let desp_iris: EyesDesp = {
      desp_x: 1,
      desp_y: -9,
      radio: -6,
    };
    let desp_pupil: EyesDesp = {
      desp_x: 3,
      desp_y: -8,
      radio: -9,
    };

    //#endregion Eye-des-vars

    const eyeOne: EyeCommonProperties = {
      position: newSnakeBase.position,
      radio: snakeBase.radio,
      desp_sclera: desp_sclera,
      desp_iris: desp_iris,
      desp_pupil: desp_pupil,

      scleraColor: SNAKE_HEAD_PROPERTIES.SNAKE_EYE_ONE_SCLERA_COLOR,
      irisColor: SNAKE_HEAD_PROPERTIES.SNAKE_EYE_ONE_IRIS_COLOR,
      pupilColor: SNAKE_HEAD_PROPERTIES.SNAKE_EYE_ONE_PUPIL_COLOR,

      scleraShadowColor:
        SNAKE_HEAD_PROPERTIES.SNAKE_EYE_ONE_SCLERA_SHADOW_COLOR,
      irisShadowColor: SNAKE_HEAD_PROPERTIES.SNAKE_EYE_ONE_IRIS_SHADOW_COLOR,
      pupilShadowColor: SNAKE_HEAD_PROPERTIES.SNAKE_EYE_ONE_PUPIL_SHADOW_COLOR,

      scleraTransparency:
        SNAKE_HEAD_PROPERTIES.SNAKE_EYE_ONE_SCLERA_TRANSPARENCY,
      irisTransparency: SNAKE_HEAD_PROPERTIES.SNAKE_EYE_ONE_IRIS_TRANSPARENCY,
      pupilTransparency: SNAKE_HEAD_PROPERTIES.SNAKE_EYE_ONE_PUPIL_TRANSPARENCY,
    };

    desp_sclera = { ...desp_sclera, desp_y: -desp_sclera.desp_y };
    desp_iris = { ...desp_iris, desp_y: -desp_iris.desp_y };
    desp_pupil = { ...desp_pupil, desp_y: -desp_pupil.desp_y };

    const eyeTwo: EyeCommonProperties = {
      position: snakeBase.position,
      radio: snakeBase.radio,
      desp_sclera: desp_sclera,
      desp_iris: desp_iris,
      desp_pupil: desp_pupil,

      scleraColor: SNAKE_HEAD_PROPERTIES.SNAKE_EYE_TWO_SCLERA_COLOR,
      irisColor: SNAKE_HEAD_PROPERTIES.SNAKE_EYE_TWO_IRIS_COLOR,
      pupilColor: SNAKE_HEAD_PROPERTIES.SNAKE_EYE_TWO_PUPIL_COLOR,

      scleraShadowColor:
        SNAKE_HEAD_PROPERTIES.SNAKE_EYE_TWO_SCLERA_SHADOW_COLOR,
      irisShadowColor: SNAKE_HEAD_PROPERTIES.SNAKE_EYE_TWO_IRIS_SHADOW_COLOR,
      pupilShadowColor: SNAKE_HEAD_PROPERTIES.SNAKE_EYE_TWO_PUPIL_SHADOW_COLOR,

      scleraTransparency:
        SNAKE_HEAD_PROPERTIES.SNAKE_EYE_TWO_SCLERA_TRANSPARENCY,
      irisTransparency: SNAKE_HEAD_PROPERTIES.SNAKE_EYE_TWO_IRIS_TRANSPARENCY,
      pupilTransparency: SNAKE_HEAD_PROPERTIES.SNAKE_EYE_TWO_PUPIL_TRANSPARENCY,
    };
    //#endregion Eyes

    ctx.save();

    // Rotación
    ctx.translate(snakeBase.position.x, snakeBase.position.y);
    //ctx.rotate(70 * (Math.PI / 180));
    ctx.rotate(snakeBase.rotation);
    ctx.translate(-snakeBase.position.x, -snakeBase.position.y);

    drawHead({
      position: snakeBase.position,
      radio: snakeBase.radio,
      color: SNAKE_HEAD_PROPERTIES.SNAKE_HEAD_COLR,
      ctx,
      transparency: SNAKE_HEAD_PROPERTIES.SNAKE_HEAD_TRANSPARENCY,
      shadowColor: SNAKE_HEAD_PROPERTIES.SNAKE_HEAD_SHADOW_COLOR,
      count,
      eyeOne,
      eyeTwo,
    });

    ctx.restore();
  }

  function updateSnake(ctx: CanvasRenderingContext2D, rotation: number) {
    draw(ctx, rotation);

    //Rotation
    const rotationAngle = 0.04;

    if (snakeBase.keys.key1 && snakeBase.keys.enable) {
      // console.log("Entro a rotación");
      const newSnakeBase = { ...snakeBase };
      newSnakeBase.rotation = newSnakeBase.rotation - rotationAngle;
      handleSnakeBaseValues(newSnakeBase);
    }
    if (snakeBase.keys.key2 && snakeBase.keys.enable) {
      const newSnakeBase = { ...snakeBase };
      newSnakeBase.rotation = newSnakeBase.rotation + rotationAngle;
      handleSnakeBaseValues(newSnakeBase);
    }
  }

  updateSnake(ctx, snakeBase.rotation);
}
