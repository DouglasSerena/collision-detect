import { GameObject } from "../core/game-object";

export class Square extends GameObject {
  public width = 50;
  public height = 50;

  constructor(x: number, y: number, velocityX: number, velocityY: number) {
    super(x, y, velocityX, velocityY);
  }

  public draw() {
    this.context.fillStyle = this.isColliding ? "#ff8080" : "#0099b0";
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  public update(seconds: number) {
    this.x += this.velocityX * seconds;
    this.y += this.velocityY * seconds;
  }

  public detectCollisions(object: Square) {
    const detect = {
      top: this.y > object.height + object.y,
      right: this.width + this.x < object.x,
      bottom: this.height + this.y < object.y,
      left: this.x > object.width + object.x,
    };

    if (detect.top || detect.right || detect.bottom || detect.left) {
      return false;
    }
    this.collision(object);
    object.collision(this);
    return true;
  }
}
