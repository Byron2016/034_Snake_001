import { createContext, useState } from "react";

// types
import type { SnakeBase, SnakeBaseContextType } from "../type/type";

// constants
import { SNAKE_BASE_PROPERTIES } from "../constants/constants";

//snakeFilters
//1.- Crear el contexto que luego será consumido
export const SnakeContext = createContext<SnakeBaseContextType | null | string>(
  "no encontrado"
);

// export interface SnakeBaseContextType {
//   asnakeBase: SnakeBase;
//   saveSnakeBase: (newSnakeBase: SnakeBase) => void;
// }
//2.- Crear el Provider, para proveer el contexto.
export function SnakeProvider({ children }: { children: React.ReactNode }) {
  // States
  const [asnakeBase, setSnakeBase] = useState<SnakeBase>({
    position: SNAKE_BASE_PROPERTIES.SNAKE_POSITION,
    velocity: SNAKE_BASE_PROPERTIES.SNAKE_VELOCITY,
    radio: SNAKE_BASE_PROPERTIES.SNAKE_HEAD_RADIO,
    rotation: SNAKE_BASE_PROPERTIES.SNAKE_INITIAL_ROTATION,
    allowTraslation: SNAKE_BASE_PROPERTIES.SNAKE_IS_TRASLATE,
    keys: { key1: false, key2: false, enable: true },
  });

  const saveSnakeBase = (newSnakeBase: SnakeBase) => {
    setSnakeBase(newSnakeBase);
  };

  // Return
  return (
    <SnakeContext.Provider
      value={{
        asnakeBase,
        saveSnakeBase,
      }}
    >
      {children}
    </SnakeContext.Provider>
  );
}
