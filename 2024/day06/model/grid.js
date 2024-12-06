import Position from "./position";
import { Direction } from "./direction";

export class Grid {
    data;

    constructor(data) {
        this.data = data.map((l, y) => l.map((val, x) => new Position(x, y, val)));
    }

    at(position) {
        return this.data[position.y][position.x];
    }

    find(char) {
        for (let y = 0; y < this.data.length; y++) {
            for (let x = 0; x < this.data[y].length; x++) {
                let curr = this.data[y][x];
                if (curr.value == char) {
                    return curr.clone();
                }
            }
        }
        return null;
    }

    height() {
        return this.data.length;
    }

    width() {
        return this.data[0].length;
    }

    moveUntil(startPosition, startDirection, onPositionChanged, onOutside) {
        let currentPosition = new Position(startPosition.x, startPosition.y);
        let currentDirection = startDirection;
        while (true) {
            let nextPosition = currentPosition.clone();
            nextPosition.move(currentDirection);
            if (this.isOutside(nextPosition) && !onOutside((direction) => currentDirection = direction)) {
                break;
            }
            onPositionChanged(this.at(currentPosition), currentDirection, this.at(nextPosition), (direction) => currentDirection = direction);
            currentPosition.move(currentDirection);
        }
    }

    isOutside(position) {
        return position.x < 0 || position.x >= this.width() || position.y < 0 || position.y >= this.height();
    }
}