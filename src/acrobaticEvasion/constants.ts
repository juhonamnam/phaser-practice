export const GAME_WIDTH = 512;
export const GAME_HEIGHT = 512;

export const CAMERA_WIDTH = 512;
export const CAMERA_HEIGHT = 512;

export const GAME_X =
  CAMERA_WIDTH > GAME_WIDTH ? (CAMERA_WIDTH - GAME_WIDTH) / 2 : 0;
export const GAME_Y =
  CAMERA_HEIGHT > GAME_HEIGHT ? (CAMERA_HEIGHT - GAME_HEIGHT) / 2 : 0;

export const PLAYER_SPEED = 5;
export const ENEMY_MISSILE_SPEED = 500;
