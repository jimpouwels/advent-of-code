import Position from "./position";

export class Grid {
    data;

    constructor(data) {
        this.data = data.map((l, y) => l.map((val, x) => new Position(parseInt(x), parseInt(y), val)));
    }

    at(position) {
        if (this.isOutside(position))
            return null;
        return this.data[position.y][position.x];
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

    isOutside(position) {
        return position.x < 0 || position.x >= this.width() || position.y < 0 || position.y >= this.height();
    }
}