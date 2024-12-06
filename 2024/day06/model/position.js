import { Direction } from "./direction";

export default class Position {
    x;
    y;
    value;

    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
    }

    clone() {
        return new Position(this.x, this.y, this.value);
    }

    move(direction) {
        this.x += direction == Direction.EAST ? 1 : direction == Direction.WEST ? -1 : 0;
        this.y += direction == Direction.SOUTH ? 1 : direction == Direction.NORTH ? -1 : 0;
    }
}