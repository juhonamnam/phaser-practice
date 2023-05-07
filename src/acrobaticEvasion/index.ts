import Phaser from "phaser";
import { LoadingScene } from "./loadingScene";
import { RoundScene } from "./roundScene";
import { CAMERA_HEIGHT, CAMERA_WIDTH } from "./constants";

export const start = (parent: HTMLDivElement) => {
  const config: Phaser.Types.Core.GameConfig = {
    width: CAMERA_WIDTH,
    height: CAMERA_HEIGHT,
    type: Phaser.AUTO,
    parent: parent,
    scene: [LoadingScene, RoundScene],
    physics: {
      default: "arcade",
      arcade: {
        debug: process.env.NODE_ENV !== "production",
      },
    },
  };

  return new Phaser.Game(config);
};
