import Position from "./position";

export class Grid {
    data;

    constructor(data) {
        this.data = data.map((l, y) => l.map((val, x) => new Position(parseInt(x), parseInt(y), val)));
    }

    at(x, y) {
        if (this.isOutOfBounds(x, y))
            return null;
        return this.data[y][x];
    }

    rows() {
        return this.data;
    }

    find(char) {
        return this.rows().reduce((matches, r) => [...matches, ...r.filter(element => element.value == char)], new Array());
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