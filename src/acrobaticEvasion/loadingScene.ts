import Phaser from "phaser";
import { CAMERA_HEIGHT, CAMERA_WIDTH } from "./constants";

export class LoadingScene extends Phaser.Scene {
  constructor() {
    super("LoadingScene");
  }

  preload() {
    this.load.image("background", "static/acrobaticEvasion/space.png");
  }

  create() {
    this.add
      .tileSprite(0, 0, CAMERA_WIDTH, CAMERA_HEIGHT, "background")
      .setOrigin(0);

    this.add
      .text(CAMERA_WIDTH / 2, CAMERA_HEIGHT / 4, "Acrobatic\nEvasion")
      .setFill("#fff")
      .setFontSize(50)
      .setOrigin(0.5)
      .setDepth(999)
      .setAlign("center");

    this.add
      .text(CAMERA_WIDTH / 2, (CAMERA_HEIGHT * 3) / 4, "Click to start")
      .setFill("#fff")
      .setFontSize(30)
      .setOrigin(0.5)
      .setDepth(999)
      .setAlign("center");

    this.input.once("pointerdown", () => {
      this.scene.transition({ target: "RoundScene", duration: 500 });
    });
  }

  update() {}
}