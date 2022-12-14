import { GameObjects, Geom, Scene } from "phaser";
import { Enemy } from "../objects/enemy.sprite";
import { Player } from "../objects/player.sprite";
import { setEnemy, setPlayer } from "../state/reducers/game.reducer";
import { Scenes, setActiveScene } from "../state/reducers/scene.reducer";
import { state$, store } from "../state/store";
import { phaserGame } from "../utils/phaser";

export class GameScene extends Scene {
  private matchfield!: Phaser.GameObjects.Sprite;
  private player!: Player;
  private enemy!: Enemy;

  public constructor() {
    super(Scenes.Game);
  }

  preload(): void {
    store.dispatch(setActiveScene({ name: Scenes.Game, scene: this }));

    const { scaleManager } = phaserGame();
    const { baseSize } = scaleManager;

    this.matchfield = new Phaser.GameObjects.Sprite(this, 0, 0, "matchfield");
    this.matchfield.setOrigin(0, 0);
    this.matchfield.setScale(1.5);
    this.children.add(this.matchfield);

    this.player = new Player();
    this.enemy = new Enemy();

    this.player.enemyTarget = this.enemy;
    this.enemy.enemyTarget = this.player;

    store.dispatch(setPlayer(this.player));
    store.dispatch(setEnemy(this.enemy));
  }

  create(): void {
    console.log("now game scene");
    state$().subscribe(({ ui }) => {
      console.log(ui);
    });
    this.player.startAutoFire();
    this.enemy.startAutoFire();
  }
}
