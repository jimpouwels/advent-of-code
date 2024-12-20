export default class Robot {
    x;
    y;
    vX;
    vY;
    maxX;
    maxY;

    constructor(x, y, vX, vY, maxX, maxY) {
        this.x = x;
        this.y = y;
        this.vX = vX;
        this.vY = vY;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    move() {
        this.x = (this.x + this.vX) % this.maxX;
        this.y = (this.y + this.vY) % this.maxY;
        if (this.x < 0) {
            this.x = this.maxX - Math.abs(this.x);
        }
        if (this.y < 0) {
            this.y = this.maxY - Math.abs(this.y);
        }
    }
}