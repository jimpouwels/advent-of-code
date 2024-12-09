import Position from "./position";

export class Grid {
    data;

    constructor(data) {
        this.data = data.map((l, y) => l.map((val, x) => new Position(parseInt(x), parseInt(y), val)));
    }

    at(position) {
        if (this.isOutOfBounds(position))
            return null;
        return this.data[position.y][position.x];
    }

    rows() {
        return this.data;
    }

    find(char) {
        return this.rows().reduce((matches, r) => [...matches, ...r.filter(element => element.value == char)], new Array()).map(p => p.clone());
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
            while (checkObstruction(this.at(nextPosition), (direction) => currentDirection = direction)) {
                nextPosition = currentPosition.clone();
                nextPosition.move(currentDirection);
            }

            currentPosition.move(currentDirection);
        }
    }

    isOutOfBounds(position) {
        return position.x < 0 || position.x >= this.width() || position.y < 0 || position.y >= this.height();
    }
}