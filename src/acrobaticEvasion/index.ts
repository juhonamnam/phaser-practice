import Phaser from "phaser";
import { LoadingScene } from "./loadingScene";
import { RoundScene } from "./roundScene";

export const start = (parent: HTMLDivElement) => {
  const config: Phaser.Types.Core.GameConfig = {
    width: 512,
    height: 512,
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
