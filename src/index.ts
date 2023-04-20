import { start } from "./survivalGame";
import { element } from "./util";
import "./style.css";

const app = () => {
  const ref = {} as {
    button: HTMLButtonElement;
    gameArea: HTMLDivElement;
    game?: Phaser.Game;
  };

  return element({
    tag: "div",
    props: {
      className: "App",
    },
    init: () => ref.game = start(ref.gameArea),
    children: [
      element({
        tag: "header",
        props: {
          className: "App-header",
        },
        children: [
          element({
            tag: "button",
            init: (self) => (ref.button = self),
            props: {
              type: "button",
            },
            events: [
              [
                "click",
                () => {
                  if (ref?.game) {
                    ref.game.destroy(true);
                    delete ref.game;
                    ref.button.textContent = "Restart Game";
                  } else {
                    ref.game = start(ref.gameArea);
                    ref.button.textContent = "End Game";
                  }
                },
              ],
            ],
            children: ["End Game"],
          }),
          element({
            tag: "div",
            init: (self) => (ref.gameArea = self),
          }),
        ],
      }),
    ],
  });
};

document.body.appendChild(app());
