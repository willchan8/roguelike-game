export type MapElement = '@' | 'e' | '#' | '.';

export type KeyCode = 37 | 38 | 39 | 40;

export interface Sprite {
  hp: number;
  damage: number;
  position: number;
}
