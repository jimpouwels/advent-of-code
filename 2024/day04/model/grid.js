import { Direction, allDirections } from "./direction";

export class Grid {
    data;

    constructor(data) {
        this.data = data;
    }

    at(x, y) {
        return this.data[y][x];
    }

    height() {
        return this.data.length;
    }

    width() {
        return this.data[0].length;
    }

    findWordCount(word) {
        return this.data.reduce((sum, line, y) =>
            sum + line.reduce((sum, _, x) => sum + allDirections.filter(direction =>
                this.findAdjacentChars(word.split(''), { x: x, y: y }, direction)).length, 0), 0);
    }

    findX_MASCount() {
        return this.data.reduce((sum, line, y) => sum + line.reduce((sum, _, x) =>
            sum + this.findX({ x: x, y: y }), 0), 0)
    }

    findAdjacentChars(chars, currentPosition, direction) {
        if (this.at(currentPosition.x, currentPosition.y) != chars[0]) return false;
        if (chars.length == 1) return true;

        let nextPosition = { x: currentPosition.x, y: currentPosition.y };
        nextPosition.x -= direction == Direction.WEST || direction == Direction.NORTH_WEST || direction == Direction.SOUTH_WEST ? 1 : 0;
        nextPosition.x += direction == Direction.EAST || direction == Direction.NORTH_EAST || direction == Direction.SOUTH_EAST ? 1 : 0;
        nextPosition.y -= direction == Direction.NORTH || direction == Direction.NORTH_EAST || direction == Direction.NORTH_WEST ? 1 : 0;
        nextPosition.y += direction == Direction.SOUTH || direction == Direction.SOUTH_EAST || direction == Direction.SOUTH_WEST ? 1 : 0;

        if (nextPosition.x < 0 || nextPosition.x == this.width() || nextPosition.y < 0 || nextPosition.y == this.height()) {
            return false;
        }
        return this.findAdjacentChars(chars.slice(1), nextPosition, direction);
    }

    findX(currentPosition) {
        if (this.at(currentPosition.x, currentPosition.y) != 'A' || currentPosition.x < 1 || currentPosition.x == this.width() - 1 || currentPosition.y < 1 || currentPosition.y == this.height() - 1) {
            return false;
        }
        return ((this.at(currentPosition.x - 1, currentPosition.y - 1) == 'M' && this.at(currentPosition.x + 1, currentPosition.y + 1) == 'S')
            || (this.at(currentPosition.x - 1, currentPosition.y - 1) == 'S' && this.at(currentPosition.x + 1, currentPosition.y + 1) == 'M')) &&
            ((this.at(currentPosition.x + 1, currentPosition.y - 1) == 'M' && this.at(currentPosition.x - 1, currentPosition.y + 1) == 'S')
                || (this.at(currentPosition.x + 1, currentPosition.y - 1) == 'S' && this.at(currentPosition.x - 1, currentPosition.y + 1) == 'M'))
    }
}