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

    equals(position) {
        return this.x == position.x && this.y == position.y;
    }
}