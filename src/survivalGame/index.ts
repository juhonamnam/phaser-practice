import Phaser from "phaser";
import { MainScene } from "./mainScene";

export const start = (parent: HTMLDivElement) => {
  const config: Phaser.Types.Core.GameConfig = {
    width: 512,
    height: 512,
    backgroundColor: "#999999",
    type: Phaser.AUTO,
    parent: parent,
    scene: [MainScene],
    scale: {
      zoom: 1.5,
    },
    physics: {
      default: "matter",
      matter: {
        debug: process.env.NODE_ENV !== "production",
        gravity: { y: 0 },
      },
    },
  };

  return new Phaser.Game(config);
};
