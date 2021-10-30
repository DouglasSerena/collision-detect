import "reflect-metadata";
import { container } from "tsyringe";
import { Game } from "./core/game";
import { Circle } from "./objects/circle";

window.addEventListener("load", () => {
  const game = container.resolve(Game);

  game.addObject(new Circle(250, 50, 0, 20, 10, 1));
  game.addObject(new Circle(250, 300, 0, -20, 20, 200));
  game.addObject(new Circle(200, 0, 50, 20, 10, 1));
  game.addObject(new Circle(250, 150, 50, 20, 10, 1));
  game.addObject(new Circle(230, 120, 20, 20, 10, 1));
  game.addObject(new Circle(210, 130, 10, 20, 10, 1));
  game.addObject(new Circle(230, 230, 10, 20, 10, 1));
  game.addObject(new Circle(290, 170, -2, 20, 10, 1));
  game.addObject(new Circle(210, 160, 10, 20, 10, 1));
  game.addObject(new Circle(210, 200, 10, 20, 10, 1));
  game.addObject(new Circle(300, 75, -20, 20, 10, 1));
  game.addObject(new Circle(300, 300, 20, -20, 10, 1));

  game.init("#root");
});
