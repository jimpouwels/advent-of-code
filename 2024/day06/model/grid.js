import Position from "./position";
import { Direction } from "./direction";

export class Grid {
    data;

    constructor(data) {
        this.data = data.map((l, y) => l.map((val, x) => new Position(x, y, val)));
    }

    at(position) {
        if (this.isOutside(position))
            return null;
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

    move(currentPosition, currentDirection, onNewPosition, checkObstruction) {
        let running = true;
        while (running) {
            if (!onNewPosition(this.at(currentPosition), currentDirection)) {
                break;
            }
            let nextPosition = currentPosition.clone();
            nextPosition.move(currentDirection);
            if (!this.at(nextPosition)) {
                break;
            }
            if (checkObstruction(this.at(nextPosition), (direction) => currentDirection = direction)) {
                nextPosition = currentPosition.clone();
                nextPosition.move(currentDirection);
                checkObstruction(this.at(nextPosition), (direction) => currentDirection = direction); // check if the new direction is also obstructed, change direction again if so...
            }

            currentPosition.move(currentDirection);
        }
    }

    isOutside(position) {
        return position.x < 0 || position.x >= this.width() || position.y < 0 || position.y >= this.height();
    }
}