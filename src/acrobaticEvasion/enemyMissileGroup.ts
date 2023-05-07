import Phaser from "phaser";
import { Player } from "./player";
import { ENEMY_MISSILE_SPEED, GAME_WIDTH } from "./constants";

export class EnemyMissileGroup extends Phaser.Physics.Arcade.Group {
  player!: Player;
  static preload(scene: Phaser.Scene) {
    scene.load.spritesheet(
      "enemy-missile",
      "static/acrobaticEvasion/balls.png",
      { frameWidth: 17, frameHeight: 17 }
    );
  }

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
      setXY: { x: Phaser.Math.Between(0, GAME_WIDTH), y: 1 },
    });

    missile.forEach((m) => {
      m.setVelocityY(ENEMY_MISSILE_SPEED);
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
