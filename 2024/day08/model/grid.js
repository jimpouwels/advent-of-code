import Position from "./position";

export class Grid {
    data;

    constructor(data) {
        this.data = data.map((l, y) => l.map((val, x) => new Position(parseInt(x), parseInt(y), val)));
    }

    at(x, y) {
        if (this.isOutside(x, y))
            return null;
        return this.data[y][x];
    }

    rows() {
        return this.data;
    }

    find(char) {
        let matches = [];
        for (let y = 0; y < this.data.length; y++) {
            for (let x = 0; x < this.data[y].length; x++) {
                let curr = this.data[y][x];
                if (curr.value == char) {
                    matches.push(curr.clone());
                }
            }
        }
        return matches;
    }

    height() {
        return this.data.length;
    }

    width() {
        return this.data[0].length;
    }

    isOutside(x, y) {
        return x < 0 || x >= this.width() || y < 0 || y >= this.height();
    }
}