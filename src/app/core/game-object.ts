import "reflect-metadata";
import { Game } from "./game";
import { container } from "tsyringe";
import { CONSTANTS } from "./constants";

export abstract class GameObject {
  public game: Game = container.resolve(Game);

  public isColliding = false;
  public restitution = 0.1;
  public degrees = 0;

  public get context() {
    return this.game.context;
  }

  constructor(
    public x: number,
    public y: number,
    public velocityX: number,
    public velocityY: number,
    public mass: number = 1
  ) {}

  public draw(): void {
    this.context.fillStyle = "#000";
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.x + this.velocityX, this.y + this.velocityY);
    this.context.stroke();
  }

  public update(seconds: number) {
    this.physical(seconds);

    this.x += this.velocityX * seconds;
    this.y += this.velocityY * seconds;
    let radians = Math.atan2(this.velocityY, this.velocityX);
    this.degrees = (180 * radians) / Math.PI;
  }

  public physical(seconds: number): void {
    this.velocityY += CONSTANTS.GRAVITY_ACCELERATION * seconds;

    this.x += this.velocityX * seconds;
    this.y += this.velocityY * seconds;
  }

  public collision(object: GameObject): void {
    this.isColliding = true;
    const velocity = { x: object.x - this.x, y: object.y - this.y };
    const distance = Math.sqrt(
      (object.x - this.x) * (object.x - this.x) +
        (object.y - this.y) * (object.y - this.y)
    );
    const velocityNormalized = {
      x: velocity.x / distance,
      y: velocity.y / distance,
    };
    const velocityRelative = {
      x: this.velocityX - object.velocityX,
      y: this.velocityY - object.velocityY,
    };
    let speed =
      velocityRelative.x * velocityNormalized.x +
      velocityRelative.y * velocityNormalized.y;
    speed *= Math.min(this.restitution, object.restitution);

    if (speed > 0) {
      const impulse = (2 * speed) / (this.mass + object.mass);

      this.velocityX -= impulse * object.mass * velocityNormalized.x;
      this.velocityY -= impulse * object.mass * velocityNormalized.y;
      object.velocityX += impulse * this.mass * velocityNormalized.x;
      object.velocityY += impulse * this.mass * velocityNormalized.y;
    }
  }

  public abstract detectCollisions(object: GameObject): boolean;
  public abstract detectEdgeCollisions(object: GameObject): void;
}
