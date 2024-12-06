import { Direction } from "./direction";

export default class Position {
    x;
    y;
    value;
    visitedDirections = [];

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

    addDirection(direction) {
        this.visitedDirections.push(direction);
    }

    hasDirection(direction) {
        return this.visitedDirections.find(d => d == direction) != null;
    }

    equals(position) {
        return this.x == position.x && this.y == position.y;
    }
}