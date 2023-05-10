import Phaser from "phaser";
import { Player } from "./player";
import { GAME_WIDTH, GAME_X } from "./constants";

export class EnemyMissileGroup extends Phaser.Physics.Arcade.Group {
  static preload(scene: Phaser.Scene) {
    scene.load.spritesheet(
      "enemy-missile",
      "static/acrobaticEvasion/balls.png",
      { frameWidth: 17, frameHeight: 17 }
    );
  }
  static RADIUS = 8.5;
  static SPEED = 500;

  player!: Player;

  constructor(scene: Phaser.Scene, player: Player) {
    super(scene.physics.world, scene, {
      defaultKey: "enemy-missile",
      collideWorldBounds: true,
    });
    this.player = player;
  }

  createMissile() {
    const missile: Phaser.Physics.Arcade.Sprite[] = this.createMultiple({
      frameQuantity: 1,
      key: "enemy-missile",
      frame: [Phaser.Math.Between(0, 4)],
      setXY: { x: Phaser.Math.Between(GAME_X, GAME_X + GAME_WIDTH), y: 1 },
    });

    missile.forEach((m) => {
      m.setCircle(EnemyMissileGroup.RADIUS);
      m.setVelocityY(EnemyMissileGroup.SPEED);
      (m.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(
        true,
        undefined,
        undefined,
        true
      );
    });

    this.scene.physics.add.overlap(missile, this.player, (missile, player) => {
      missile.destroy();
    });
  }
}
