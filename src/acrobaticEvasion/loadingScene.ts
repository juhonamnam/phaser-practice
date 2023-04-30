import Phaser from "phaser";

export class LoadingScene extends Phaser.Scene {
  constructor() {
    super("LoadingScene");
  }

  preload() {
    this.load.image("background", "static/acrobaticEvasion/space.png");
  }

  create() {
    const { x, y, width, height } = this.cameras.main;
    this.add
      .tileSprite(x, y, width, height, "background")
      .setOrigin(0)
      .setScrollFactor(0, 1);

    const center = {
      x: x + width / 2,
      y: y + height / 2,
    };

    this.add
      .text(center.x, height / 4, "Acrobatic\nEvasion")
      .setFill("#fff")
      .setFontSize(50)
      .setOrigin(0.5)
      .setDepth(999)
      .setAlign("center");

    this.add
      .text(center.x, (height * 3) / 4, "Click to start")
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
