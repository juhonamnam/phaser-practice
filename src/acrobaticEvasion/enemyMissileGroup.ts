import Phaser from "phaser";

const SPEED = 500;

export class EnemyMissileGroup extends Phaser.Physics.Arcade.Group {
  static preload(scene: Phaser.Scene) {
    scene.load.spritesheet(
      "enemy-missile",
      "static/acrobaticEvasion/balls.png",
      { frameWidth: 17, frameHeight: 17 }
    );
  }

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene, {
      defaultKey: "enemy-missile",
      collideWorldBounds: true,
    });
  }

  createMissile() {
    const missile: Phaser.Physics.Arcade.Sprite[] = this.createMultiple({
      frameQuantity: 1,
      key: "enemy-missile",
      frame: [Phaser.Math.Between(0, 4)],
      setXY: { x: 100, y: 50 },
    });

    missile.forEach((m) => {
      m.setVelocityY(SPEED);
    });
  }
}
