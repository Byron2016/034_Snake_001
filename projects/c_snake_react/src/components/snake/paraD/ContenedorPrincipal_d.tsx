import { useState } from "react";

// types
import type {
  ContenedorPrincipalProps,
  SnakeBackgroundProps,
} from "./type/type.d";

// Components
import Button from "../Button";
import Snake from "./Snake";

// utils
import drawBackground from "./utils/background";
import { drawHead } from "./utils/drawHead"; //1

import { SnakeProvider } from "./context/snakeFilters";

const ContenedorPrincipal = ({
  width,
  height,
  color,
}: ContenedorPrincipalProps) => {
  const [juegoPausado, setJuegoPausado] = useState(true);

  // Botones
  //#region botones
  const textPause = juegoPausado ? "SI pausado" : "NO pausado";
  const buttonDescription = juegoPausado ? "Jugar" : "Pausar";

  function handleClick() {
    //console.log(`Estado del juego A: ${juegoPausado}`);
    const newJuegoPausado = !juegoPausado;
    setJuegoPausado(newJuegoPausado);
    //console.log(`Estado del juego D: ${newJuegoPausado}`);
  }

  function handleClearConsoleButtonClick() {
    console.clear();
  }
  //#endregion botones

  const snake: SnakeBackgroundProps = {
    drawBackground,
    drawHead,
    width,
    height,
    color,
  };

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

      <SnakeProvider>
        <Snake {...snake} />
      </SnakeProvider>
    </>
  );
};

export default ContenedorPrincipal;
