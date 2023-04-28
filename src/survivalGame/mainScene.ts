import Phaser from "phaser";
import { Player } from "./player";

export class MainScene extends Phaser.Scene {
  player = {} as Player;

  constructor() {
    super("MainScene");
  }

  preload() {
    Player.preload(this);
    this.load.image("tiles", "static/survivalGame/rpg_nature_tileset.png");
    this.load.tilemapTiledJSON("map", "static/survivalGame/map.json");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage(
      "rpg_nature_tileset",
      "tiles",
      32,
      32,
      0,
      0
    );
    const layer1 = map.createLayer("Tile Layer 1", tileset, 0, 0);
    const layer2 = map.createLayer("Tile Layer 2", tileset, 0, 0);
    layer1.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer1);
    this.player = new Player({
      world: this.matter.world,
      x: 100,
      y: 100,
      keys: {
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
      },
    });
  }

  update() {
    this.player.update();
  }
}
