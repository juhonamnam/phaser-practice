import Phaser from "phaser";
import { PLAYER_SPEED } from "./constants";

type PlayerInputKeys = {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
};

export class Player extends Phaser.Physics.Arcade.Image {
  inputKeys: PlayerInputKeys;

  static preload(scene: Phaser.Scene) {
    scene.load.image(
      "PlayerDefault",
      "static/acrobaticEvasion/player-default.png"
    );
    scene.load.image(
      "PlayerBaseAttack",
      "static/acrobaticEvasion/player-base-attack.png"
    );
    scene.load.image(
      "PlayerAdvanceAttack",
      "static/acrobaticEvasion/player-advance-attack.png"
    );
    scene.load.image(
      "PlayerDamaged",
      "static/acrobaticEvasion/player-damaged.png"
    );
  }
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "PlayerDefault");
    this.setDepth(6);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);

    this.inputKeys = {
      up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.DOWN
      ),
      left: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.LEFT
      ),
      right: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.RIGHT
      ),
    };
  }

  preUpdate() {
    const pointer = this.scene.input.activePointer;
    if (pointer.isDown) {
      const distance = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        pointer.x,
        pointer.y
      );

      if (distance < PLAYER_SPEED) {
        this.x = pointer.x;
        this.y = pointer.y;
      } else {
        const angle = Phaser.Math.Angle.Between(
          this.x,
          this.y,
          pointer.x,
          pointer.y
        );

        const dx = Math.cos(angle) * PLAYER_SPEED;
        const dy = Math.sin(angle) * PLAYER_SPEED;

        this.x += dx;
        this.y += dy;
      }
    } else {
      const vector = new Phaser.Math.Vector2();
      if (this.inputKeys.left.isDown) vector.x -= 1;
      if (this.inputKeys.right.isDown) vector.x += 1;
      if (this.inputKeys.up.isDown) vector.y -= 1;
      if (this.inputKeys.down.isDown) vector.y += 1;
      vector.normalize();
      vector.scale(PLAYER_SPEED);
      this.x += vector.x;
      this.y += vector.y;
    }
  }
}
