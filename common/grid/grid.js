import Position from "./position";
import { Direction } from "./direction";

export default class Grid {
    data;

    constructor(data, fieldParser) {
        this.data = data.map(l => l.split('')).map((l, y) => l.map((val, x) => new Position(x, y, fieldParser(val))));
    }

    at(x, y, predicate) {
        if (this.isOutOfBounds(x, y))
            return null;
        let pos = this.data[y][x];
        return predicate ? predicate(pos) ? pos : null : pos;
    }

    rows() {
        return this.data;
    }

    next(from, direction) {
        let next = null;
        switch (direction) {
            case Direction.West:
                next = this.left(from);
                break;
            case Direction.East:
                next = this.right(from);
                break;
            case Direction.North:
                next = this.above(from);
                break;
            case Direction.South:
                next = this.below(from);
                break;
            case Direction.NorthWest:
                next = this.at(from.x - 1, from.y - 1);
                break;
            case Direction.NorthEast:
                next = this.at(from.x + 1, from.y - 1);
                break;
            case Direction.SouthWest:
                next = this.at(from.x - 1, from.y + 1);
                break;
            case Direction.SouthEast:
                next = this.at(from.x + 1, from.y + 1);
                break;
        }
        return next;
    }

    isEdge(x, y) {
        return x == 0 || x == this.width() - 1 || y == 0 || y == this.height() - 1;
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

    findFirst(value) {
        return this.find(value)[0];
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