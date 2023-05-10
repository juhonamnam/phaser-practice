import Phaser from "phaser";

export class Monster extends Phaser.Physics.Arcade.Image {
  static preload(scene: Phaser.Scene) {
    scene.load.image(
      "MonsterDamaged",
      "static/acrobaticEvasion/monster-damaged.png"
    );
    scene.load.image(
      "MonsterDefault",
      "static/acrobaticEvasion/monster-default.png"
    );
    scene.load.image(
      "MonsterWarning",
      "static/acrobaticEvasion/monster-warning.png"
    );
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "MonsterDefault");
    this.setDepth(5);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
  }
}
