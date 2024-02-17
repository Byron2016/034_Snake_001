import type { SnakeProps } from "./type/type.d";

export const initialState: SnakeProps = {
  position: { x: 150, y: 150 },
  radio: 11,
  color: "#FEBA39",
  velocity: 1.1,
  rotation: 0,
  transparency: 1,
  isDeath: false,
  keys: { key1: false, key2: false, enable: true },
};
