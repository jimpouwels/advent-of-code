import Position from "./position";

export default class Grid {
    data;

    constructor(data) {
        this.data = data.map((l, y) => l.map((val, x) => new Position(parseInt(x), parseInt(y), parseInt(val))));
    }

    at(x, y) {
        if (this.isOutOfBounds(x, y))
            return null;
        return this.data[y][x];
    }

    rows() {
        return this.data;
    }

    left(position) {
        return this.isOutOfBounds(position.x - 1, position.y) ? null : this.at(position.x - 1, position.y);
    }

    right(position) {
        return this.isOutOfBounds(position.x + 1, position.y) ? null : this.at(position.x + 1, position.y);
    }

    above(position) {
        return this.isOutOfBounds(position.x, position.y - 1) ? null : this.at(position.x, position.y - 1);
    }

    below(position) {
        return this.isOutOfBounds(position.x, position.y + 1) ? null : this.at(position.x, position.y + 1);
    }

    find(value) {
        return this.rows().reduce((matches, r) => [...matches, ...r.filter(element => element.value == value)], new Array());
    }

    height() {
        return this.data.length;
    }

    width() {
        return this.data[0].length;
    }

    isOutOfBounds(x, y) {
        return x < 0 || x >= this.width() || y < 0 || y >= this.height();
    }
}