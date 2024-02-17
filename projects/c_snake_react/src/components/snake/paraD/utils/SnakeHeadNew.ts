// types
import type {
  SnakeHeadProps,
  EyeCommonProperties,
  EyesDesp,
} from "../type/type";

export function SnakeHeadNew({
  drawHead,
  position,
  ctx,
  count,
  keys,
  rotation,
  handleRotation,
}: SnakeHeadProps) {
  //const keys: KeysPressed = { key1: false, key2: false, enable: true };

  function draw(ctx: CanvasRenderingContext2D, rotation: number) {
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

    //const delta = count % 800;
    //const newPosition = { x: position.x + delta, y: position.y };

    //position = { x: position.x + delta, y: position.y };

    const eyeOne: EyeCommonProperties = {
      position,
      radio: 11,
      desp_sclera: desp_sclera,
      desp_iris: desp_iris,
      desp_pupil: desp_pupil,

      scleraColor: "white",
      irisColor: "black",
      pupilColor: "white",

      scleraShadowColor: "transparent",
      irisShadowColor: "transparent",
      pupilShadowColor: "transparent",

      scleraTransparency: 1,
      irisTransparency: 1,
      pupilTransparency: 1,
    };

    desp_sclera = { ...desp_sclera, desp_y: -desp_sclera.desp_y };
    desp_iris = { ...desp_iris, desp_y: -desp_iris.desp_y };
    desp_pupil = { ...desp_pupil, desp_y: -desp_pupil.desp_y };

    const eyeTwo: EyeCommonProperties = {
      position,
      radio: 11,
      desp_sclera: desp_sclera,
      desp_iris: desp_iris,
      desp_pupil: desp_pupil,

      scleraColor: "white",
      irisColor: "black",
      pupilColor: "white",

      scleraShadowColor: "transparent",
      irisShadowColor: "transparent",
      pupilShadowColor: "transparent",

      scleraTransparency: 1,
      irisTransparency: 1,
      pupilTransparency: 1,
    };

    ctx.save();

    // Rotación
    ctx.translate(position.x, position.y);
    //ctx.rotate(70 * (Math.PI / 180));
    ctx.rotate(rotation);
    ctx.translate(-position.x, -position.y);

    drawHead({
      position,
      radio: 11,
      color: "yellow",
      ctx,
      transparency: 1,
      shadowColor: "blue",
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

    if (keys.key1 && keys.enable) {
      // console.log("Entro a rotación");
      rotation = rotation - rotationAngle;
      handleRotation({ rotationValue: rotation });
    }
    if (keys.key2 && keys.enable) {
      rotation = rotation + rotationAngle;
      handleRotation({ rotationValue: rotation });
    }

    //position.x = position.x + Math.cos(rotation);
  }

  updateSnake(ctx, rotation);
}
