import { CONSTANTS } from "../core/constants";
import { GameObject } from "../core/game-object";

export class Circle extends GameObject {
  public radius = 10;

  constructor(
    x: number,
    y: number,
    velocityX: number,
    velocityY: number,
    radius: number = 10,
    mass?: number
  ) {
    super(x, y, velocityX, velocityY, mass);
    this.radius = radius;
  }

  public draw() {
    this.context.fillStyle = this.isColliding ? "#ff8080" : "#0099b0";
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.fill();
    super.draw();
  }

  public update(seconds: number) {
    super.update(seconds);
    this.x += this.velocityX * seconds;
    this.y += this.velocityY * seconds;
  }

  public detectEdgeCollisions() {
    if (this.x < this.radius) {
      this.velocityX = Math.abs(this.velocityX) * CONSTANTS.RESTITUTION;
      this.x = this.radius;
    } else if (this.x > this.game.width - this.radius) {
      this.velocityX = -Math.abs(this.velocityX) * CONSTANTS.RESTITUTION;
      this.x = this.game.width - this.radius;
    }

    if (this.y < this.radius) {
      this.velocityY = Math.abs(this.velocityY) * CONSTANTS.RESTITUTION;
      this.y = this.radius;
    } else if (this.y > this.game.height - this.radius) {
      this.velocityY = -Math.abs(this.velocityY) * CONSTANTS.RESTITUTION;
      this.y = this.game.height - this.radius;
    }
  }

  public detectCollisions(object: Circle) {
    this.detectEdgeCollisions();

    let distance =
      (this.x - object.x) * (this.x - object.x) +
      (this.y - object.y) * (this.y - object.y);

    if (
      distance >
      (this.radius + object.radius) * (this.radius + object.radius)
    ) {
      return false;
    }
    this.collision(object);
    object.collision(this);
    return true;
  }
}
