import { useEffect, useState, useRef } from "react";

import type { SnakeProps, DrawCircleProps, drawEyesProps } from "./type/type.d";

// Componentes
import Button from "./Button";

interface Props {
  width: number;
  height: number;
  fillColor: string;
}

const initialState: SnakeProps = {
  position: { x: 50, y: 50 },
  radio: 11,
  color: "#FEBA39",
  velocity: 1.5,
  rotation: 0,
  transparency: 1,
  isDeath: false,
  keys: { key1: false, key2: false, enable: true },
};

const ContenedorPrincipal = ({ width, height, fillColor }: Props) => {
  const [snake, setSnake] = useState(initialState);
  const [juegoPausado, setJuegoPausado] = useState(true);

  let refCircle = useRef(null);

  function init() {
    //console.clear();
    //console.log("Entro init");
    const newSnake = { ...snake };
    newSnake.position = {
      x: initialState.position.x,
      y: initialState.position.y,
    };
    newSnake.radio = initialState.radio;
    newSnake.color = initialState.color;
    newSnake.velocity = initialState.velocity;
    newSnake.rotation = initialState.rotation;
    newSnake.transparency = initialState.transparency;
    newSnake.isDeath = initialState.isDeath;
    newSnake.keys.enable = initialState.keys.enable;
    newSnake.keys.key1 = initialState.keys.key1;
    newSnake.keys.key2 = initialState.keys.key2;
    setSnake(newSnake);
  }

  function background({
    width,
    height,
    color,
    ctx,
  }: {
    width: number;
    height: number;
    color: string;
    ctx: CanvasRenderingContext2D;
  }) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < height; i += 80) {
      for (let j = 0; j < width; j += 80) {
        ctx.fillStyle = "#23253C";
        ctx.fillRect(j + 10, i + 10, 70, 70);
      }
    }
  }

  function drawCircle({
    x,
    y,
    radio,
    color,
    ctx,
    transparency,
    shadowColor,
  }: DrawCircleProps) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radio, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.globalAlpha = transparency;
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  function drawEyes({
    desp_x_sclera,
    desp_y_sclera,
    radio_sclera,
    desp_x_iris,
    desp_y_iris,
    radio_iris,
    desp_x_pupil,
    desp_y_pupil,
    radio_pupil,
    ctx,
    transparency,
  }: drawEyesProps) {
    const x = snake.position.x;
    const y = snake.position.y;
    const radio = snake.radio;

    //Sclera
    drawCircle({
      x: x + desp_x_sclera,
      y: y + desp_y_sclera,
      radio: radio + radio_sclera,
      color: "white",
      ctx,
      transparency: transparency,
      shadowColor: "transparent",
    });

    //Iris
    drawCircle({
      x: x + desp_x_iris,
      y: y + desp_y_iris,
      radio: radio + radio_iris,
      color: "black",
      ctx,
      transparency: transparency,
      shadowColor: "transparent",
    });

    //Pupil
    drawCircle({
      x: x + desp_x_pupil,
      y: y + desp_y_pupil,
      radio: radio + radio_pupil,
      color: "white",
      ctx,
      transparency: transparency,
      shadowColor: "transparent",
    });
  }

  function drawHead(ctx: CanvasRenderingContext2D, transparency: number) {
    drawCircle({
      x: snake.position.x,
      y: snake.position.y,
      radio: snake.radio,
      color: snake.color,
      ctx: ctx,
      transparency: transparency,
      shadowColor: snake.color,
    });

    drawEyes({
      desp_x_sclera: 0,
      desp_y_sclera: -9,
      radio_sclera: -4,
      desp_x_iris: 1,
      desp_y_iris: -9,
      radio_iris: -6,
      desp_x_pupil: 3,
      desp_y_pupil: -8,
      radio_pupil: -9,
      ctx,
      transparency: transparency,
    });
    drawEyes({
      desp_x_sclera: 0,
      desp_y_sclera: 9,
      radio_sclera: -4,
      desp_x_iris: 1,
      desp_y_iris: 9,
      radio_iris: -6,
      desp_x_pupil: 3,
      desp_y_pupil: 8,
      radio_pupil: -9,
      ctx,
      transparency: transparency,
    });
  }

  function draw(ctx: CanvasRenderingContext2D) {
    const x = snake.position.x;
    const y = snake.position.y;
    const rotationAngle = snake.rotation;
    const transparency = snake.transparency;

    ctx.save();

    // ROTATION
    ctx.translate(x, y);
    //ctx.rotate(rotationAngle * (Math.PI / 180));
    ctx.rotate(rotationAngle);
    ctx.translate(-x, -y);

    drawHead(ctx, transparency);

    ctx.restore();
  }

  function collision({
    canvasWidth,
    canvasHeith,
  }: {
    canvasWidth: number;
    canvasHeith: number;
  }) {
    if (
      snake.position.x - snake.radio <= 0 ||
      snake.position.x + snake.radio >= canvasWidth ||
      snake.position.y - snake.radio <= 0 ||
      snake.position.y + snake.radio >= canvasHeith
    ) {
      death();
    }
  }

  function death() {
    const newSnake: SnakeProps = { ...snake };
    newSnake.velocity = 0;
    newSnake.keys.enable = false;
    newSnake.isDeath = true;
    // snake.body.forEach((b) => {
    //   let lastItem = b.path[b.path.length - 1];
    //   for (let i = 0; i < b.path.length; i++) {
    //     b.path[i] = lastItem;
    //   }
    //   b.transparency = this.transparency;
    // });
    setSnake(newSnake);
  }

  function update({
    ctx,
    canvasWidth,
    canvasHeith,
  }: {
    ctx: CanvasRenderingContext2D;
    canvasWidth: number;
    canvasHeith: number;
  }) {
    if (snake.isDeath) {
      const newSnake: SnakeProps = { ...snake };
      newSnake.transparency = newSnake.transparency - 0.02;
      setSnake(newSnake);
    }

    // mio
    const newSnake: SnakeProps = { ...snake };
    newSnake.transparency = newSnake.transparency - 0.002;
    setSnake(newSnake);
    if (snake.transparency < 0) {
      init();
    }

    draw(ctx);

    if (!snake.isDeath) {
      // Rotación
      const rotationAngle = 0.04;
      if (snake.keys.key1 && snake.keys.enable) {
        const newSnake: SnakeProps = { ...snake };
        newSnake.rotation = newSnake.rotation - rotationAngle;
        setSnake(newSnake);
      }
      if (snake.keys.key2 && snake.keys.enable) {
        const newSnake: SnakeProps = { ...snake };
        newSnake.rotation = newSnake.rotation + rotationAngle;
        setSnake(newSnake);
      }
    }

    if (!snake.isDeath) {
      // Desplazamiento
      // const newSnake: SnakeProps = { ...snake };
      // newSnake.position.x = newSnake.position.x + Math.cos(newSnake.rotation);
      // newSnake.position.y = newSnake.position.y + Math.cos(newSnake.rotation);
      // // Update State of snake
      // setSnake(newSnake);
    }

    collision({ canvasWidth, canvasHeith });
  }

  useEffect(() => {
    //console.clear();
    console.log("entro");
  }, [juegoPausado]);

  useEffect(() => {
    if (juegoPausado) {
      console.log("use efect va a hacer return");
      return;
    }
    let ratio = 1;

    let canvas = refCircle.current! as HTMLCanvasElement;
    let ctx = canvas.getContext("2d")!;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    //eventos
    //eventos key down
    const handlekeyDown = (evt) => {
      if (evt.key == "a" || evt.key == "A") {
        //console.log("key pressed");
        const newSnake: SnakeProps = { ...snake };
        newSnake.keys.key1 = true;
        setSnake(newSnake);
      }

      if (evt.key == "d" || evt.key == "D") {
        //console.log("key pressed");
        const newSnake: SnakeProps = { ...snake };
        newSnake.keys.key2 = true;
        setSnake(newSnake);
      }
    };

    //eventos key up
    const handlekeyUP = (evt) => {
      if (evt.key == "a" || evt.key == "A") {
        //console.log("key unpressed");
        const newSnake: SnakeProps = { ...snake };
        newSnake.keys.key1 = false;
        setSnake(newSnake);
      }

      if (evt.key == "d" || evt.key == "D") {
        //console.log("key unpressed");
        const newSnake: SnakeProps = { ...snake };
        newSnake.keys.key2 = false;
        setSnake(newSnake);
      }
    };

    // crear listeners
    document.addEventListener("keydown", handlekeyDown);
    document.addEventListener("keyup", handlekeyUP);

    let requestId: number;

    function updateEffect() {
      background({
        width: canvas.width,
        height: canvas.height,
        color: fillColor,
        ctx: ctx,
      });
      // draw(ctx);
      update({ ctx, canvasWidth: canvas.width, canvasHeith: canvas.height });

      requestId = requestAnimationFrame(updateEffect);
    }

    updateEffect();

    return () => {
      // cleanup method

      // destruír listeners
      document.removeEventListener("keydown", handlekeyDown);
      document.removeEventListener("keyup", handlekeyUP);

      cancelAnimationFrame(requestId);
    };
  }, [snake, juegoPausado]);

  const textPause = juegoPausado ? "SI pausado" : "NO pausado";
  const buttonDescription = juegoPausado ? "Jugar" : "Pausar";

  function handleClick() {
    console.log(`Estado del juego A: ${juegoPausado}`);
    const newJuegoPausado = !juegoPausado;
    setJuegoPausado(newJuegoPausado);
    console.log(`Estado del juego D: ${newJuegoPausado}`);
  }

  function handleClearConsoleButtonClick() {
    console.clear();
  }

  return (
    <>
      <Button description={buttonDescription} handleClick={handleClick} />
      <Button
        {...{
          description: "Clean console",
          handleClick: handleClearConsoleButtonClick,
        }}
      />
      <span>{textPause}</span>
      {juegoPausado && (
        <section>
          <article>
            <figure>
              <img src="./SnakeO2.jpg" alt="Imagen juego Snake" />
              <figcaption>Press play to begin / pause Snake 🐍 </figcaption>
            </figure>
          </article>
        </section>
      )}

      <canvas ref={refCircle}></canvas>
    </>
  );
};

export default ContenedorPrincipal;
