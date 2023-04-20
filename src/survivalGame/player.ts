import Phaser from "phaser";

const KEY = "female";
const SPEED = 2.5;

type PlayerInputKeys = {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
};

export class Player extends Phaser.Physics.Matter.Sprite {
  static preload(scene: Phaser.Scene) {
    scene.load.atlas(KEY, "static/female.png", "static/female_atlas.json");
    scene.load.animation(KEY, "static/female_anim.json");
  }
  inputKeys = {} as PlayerInputKeys;

  constructor({
    world,
    x,
    y,
    keys = {},
  }: {
    world: Phaser.Physics.Matter.World;
    x: number;
    y: number;
    keys?: {
      up?: number;
      down?: number;
      left?: number;
      right?: number;
    };
  }) {
    super(world, x, y, KEY, "townsfolk_f_idle_1");
    this.scene.add.existing(this);
    this.inputKeys = this.scene.input.keyboard.addKeys(keys) as PlayerInputKeys;

    const playerCollider = this.scene.matter.bodies.circle(this.x, this.y, 12, {
      isSensor: false,
      label: "playerCollider",
    });

    const playerSensor = this.scene.matter.bodies.circle(this.x, this.y, 24, {
      isSensor: true,
      label: "playerSensor",
    });

    const compountBody = this.scene.matter.body.create({
      parts: [playerCollider, playerSensor],
      frictionAir: 0.35,
    });

    this.setExistingBody(compountBody);
    this.setFixedRotation();

    this.anims.play("idle", true);
  }

  update() {
    const playerVelocity = new Phaser.Math.Vector2();

    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
    } else if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
    }

    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
    }

    playerVelocity.normalize();
    playerVelocity.scale(SPEED);
    this.setVelocity(playerVelocity.x, playerVelocity.y);

    if (this.body.velocity.x || this.body.velocity.y) {
      this.anims.play("walk", true);
    } else {
      this.anims.play("idle", true);
    }
  }
}
