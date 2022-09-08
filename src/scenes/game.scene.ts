import { Scene } from "phaser";
import { Player } from "../objects/player.sprite";
import { Scenes, setActiveScene } from "../state/reducers/scene.reducer";
import { state$, store } from "../state/store";
import { phaserGame } from "../utils/phaser";

export class GameScene extends Scene {
  private matchfield!: Phaser.GameObjects.Sprite;
  private player!: Player;

  public constructor() {
    super(Scenes.GameScene);
  }

  preload(): void {
    const { scaleManager } = phaserGame();
    const { baseSize } = scaleManager;

    store.dispatch(setActiveScene({ name: Scenes.GameScene, scene: this }));

    this.matchfield = new Phaser.GameObjects.Sprite(this, 0, 0, "matchfield");
    this.matchfield.setOrigin(0, 0);
    this.matchfield.setScale(1.5);
    this.children.add(this.matchfield);

    this.player = new Player("player");
  }

  create(): void {
    console.log("now game scene");
    state$().subscribe(({ ui }) => {
      console.log(ui);
    });

    this.input.on(
      Phaser.Input.Events.POINTER_DOWN,
      (pointer: Phaser.Input.Pointer) => {
        console.log("pointer down", pointer);
        this.player.moveTo(pointer.x, pointer.y);
      },
      this
    );
  }
}
