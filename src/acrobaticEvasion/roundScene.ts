import Phaser from "phaser";
import { Monster } from "./monster";
import { Player } from "./player";

export class RoundScene extends Phaser.Scene {
  constructor() {
    super("RoundScene");
  }

  preload() {
    Monster.preload(this);
    Player.preload(this);
    this.load.image("background", "static/acrobaticEvasion/space.png");
    this.load.image("OrbBlue", "static/acrobaticEvasion/orb-blue.png");
    this.load.image("OrbGreen", "static/acrobaticEvasion/orb-green.png");
    this.load.image("OrbRed", "static/acrobaticEvasion/orb-red.png");
    this.load.spritesheet(
      "enemy-missile",
      "static/acrobaticEvasion/balls.png",
      { frameWidth: 17, frameHeight: 17 }
    );
    this.load.spritesheet(
      "explosion",
      "static/acrobaticEvasion/explosion.png",
      { frameWidth: 130.5, frameHeight: 130.5 }
    );
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

    new Monster(this, center.x, height / 5);

    new Player(this, center.x, (height * 4) / 5);
  }

  update() {}
}
