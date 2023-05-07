import Phaser from "phaser";
import { Monster } from "./monster";
import { Player } from "./player";
import { EnemyMissileGroup } from "./enemyMissileGroup";
import { GAME_HEIGHT, GAME_WIDTH, GAME_X, GAME_Y } from "./constants";

export class RoundScene extends Phaser.Scene {
  enemyMissileGroup!: EnemyMissileGroup;
  player!: Player;
  constructor() {
    super("RoundScene");
  }

  preload() {
    Monster.preload(this);
    Player.preload(this);
    EnemyMissileGroup.preload(this);
    this.load.image("background", "static/acrobaticEvasion/space.png");
    this.load.image("OrbBlue", "static/acrobaticEvasion/orb-blue.png");
    this.load.image("OrbGreen", "static/acrobaticEvasion/orb-green.png");
    this.load.image("OrbRed", "static/acrobaticEvasion/orb-red.png");
    this.load.spritesheet(
      "explosion",
      "static/acrobaticEvasion/explosion.png",
      { frameWidth: 130.5, frameHeight: 130.5 }
    );
  }

  create() {
    this.cameras.main.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.physics.world.setBounds(GAME_X, GAME_Y, GAME_WIDTH, GAME_HEIGHT);
    this.add
      .tileSprite(GAME_X, GAME_Y, GAME_WIDTH, GAME_HEIGHT, "background")
      .setOrigin(0)
      .setScrollFactor(0.5, 0.5);
    this.physics.world.on("worldbounds", (body: Phaser.Physics.Arcade.Body) => {
      body.gameObject.destroy();
    });

    new Monster(this, GAME_X + GAME_WIDTH / 2, GAME_Y + GAME_HEIGHT / 5);
    this.player = new Player(
      this,
      GAME_X + GAME_WIDTH / 2,
      GAME_Y + (GAME_HEIGHT * 4) / 5
    );
    this.cameras.main.startFollow(this.player);
    this.enemyMissileGroup = new EnemyMissileGroup(this, this.player);
  }

  frameCount = 0;

  update() {
    this.frameCount++;
    if (this.frameCount % 10 === 0) {
      this.enemyMissileGroup.createMissile();
    }
  }
}
