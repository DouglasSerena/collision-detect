import "reflect-metadata";
import { singleton } from "tsyringe";
import { GameObject } from "./game-object";

@singleton()
export class Game {
  private oldTime = 0;

  private canvas: HTMLCanvasElement;
  private objects: GameObject[] = [];

  public context: CanvasRenderingContext2D;
  public pointer = { x: 0, y: 0 };

  public get width() {
    return this.canvas.width;
  }
  public get height() {
    return this.canvas.height;
  }

  constructor() {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    this.canvas.width = 500;
    this.canvas.height = 500;

    this.canvas.addEventListener("mousemove", (event) => {
      this.pointer = {
        x: event.x - this.canvas.offsetLeft,
        y: event.y - this.canvas.offsetTop,
      };
    });

    this.update(0);
  }

  public addObject(object: GameObject) {
    this.objects.push(object);
  }

  public init(container: string) {
    document.querySelector(container).appendChild(this.canvas);
  }

  private update(secondsPassed: number) {
    const seconds = (secondsPassed - this.oldTime) / 1000;
    this.oldTime = secondsPassed;

    for (const object of this.objects) {
      object.update(seconds);
    }

    this.detectCollisions();
    this.clear();

    this.drawCursorPosition();
    this.drawFPS(seconds);
    for (const object of this.objects) {
      object.draw();
    }

    window.requestAnimationFrame((time: number) => this.update(time));
  }

  private detectCollisions() {
    for (const object of this.objects) {
      object.isColliding = false;
    }

    this.objects.forEach((object, index) => {
      for (
        let indexDetect = index + 1;
        indexDetect < this.objects.length;
        indexDetect++
      ) {
        object.detectCollisions(this.objects[indexDetect]);
      }
    });
  }

  private drawCursorPosition() {
    this.context.fillStyle = "#000";
    this.context.font = "bold 12px Arial";
    this.context.fillText(
      `X: ${this.pointer.x} / Y: ${this.pointer.y}`,
      10,
      20
    );
  }

  private drawFPS(seconds: number) {
    const fps = Math.round(1 / seconds);
    this.context.fillStyle = "#000";
    this.context.font = "bold 12px Arial";
    this.context.fillText(`FPS: ${fps}`, this.width - 60, 20);
  }

  /** @private @description Limpar tela */
  private clear() {
    const { width, height } = this.canvas;
    this.context.clearRect(0, 0, width, height);
  }
}
