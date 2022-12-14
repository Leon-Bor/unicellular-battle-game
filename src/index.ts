import { Game, Types } from "phaser";
import "phaser/plugins/spine/dist/SpinePlugin";
import "reflect-metadata";
import { LoadingScene } from "./scenes/loading.scene";
import { GameScene } from "./scenes/game.scene";
import { createUi } from "./main";
import { GameConfig } from "./game.config";
import { MenuScene } from "./scenes/menu.scene";

declare global {
  interface Window {
    game: Phaser.Game;
    SpinePlugin: any;
  }
}

const phaserConfig: Types.Core.GameConfig = {
  title: "Unicellular Battle",
  type: Phaser.WEBGL,
  parent: "game",
  backgroundColor: "#101010",
  input: {
    activePointers: 4,
  },
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    height: 1920,
    width: 1080,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: GameConfig.debug,
      gravity: { y: 0, x: 0 },
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: false,
  },
  autoFocus: false,
  audio: {
    disableWebAudio: false,
  },
  scene: [LoadingScene, MenuScene, GameScene],
  plugins: {
    scene: [
      { key: "SpinePlugin", plugin: window.SpinePlugin, mapping: "spine" },
    ],
  },
  callbacks: {
    postBoot: () => {
      createUi();
    },
  },
};

window.game = new Game(phaserConfig);
