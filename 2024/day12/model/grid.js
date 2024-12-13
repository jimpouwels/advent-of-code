import Position from "./position";

export default class Grid {
    data;

    constructor(data) {
        this.data = data.map(l => l.split('')).map((l, y) => l.map((val, x) => new Position(parseInt(x), parseInt(y), val)));
    }

    at(x, y, predicate) {
        if (this.isOutOfBounds(x, y))
            return null;
        let pos = this.data[y][x];
        return predicate(pos) ? pos : null;
    }

    rows() {
        return this.data;
    }

    left(position, predicate) {
        return this.isOutOfBounds(position.x - 1, position.y) ? null : this.at(position.x - 1, position.y, predicate);
    }

    right(position, predicate) {
        return this.isOutOfBounds(position.x + 1, position.y) ? null : this.at(position.x + 1, position.y, predicate);
    }

    above(position, predicate) {
        return this.isOutOfBounds(position.x, position.y - 1) ? null : this.at(position.x, position.y - 1, predicate);
    }

    below(position, predicate) {
        return this.isOutOfBounds(position.x, position.y + 1) ? null : this.at(position.x, position.y + 1, predicate);
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