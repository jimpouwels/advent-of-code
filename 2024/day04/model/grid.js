import { Direction, allDirections } from "./direction";
import Grid from "../../../common/grid/grid";

export class ChristmasGrid extends Grid {

    findWordCount(word) {
        return this.data.reduce((sum, line, y) =>
            sum + line.reduce((sum, _, x) => sum + allDirections.filter(direction =>
                this.findAdjacentChars(word.split(''), { x: x, y: y }, direction)).length, 0), 0);
    }

    findX_MASCount() {
        return this.data.reduce((sum, line, y) => sum + line.reduce((sum, _, x) =>
            sum += this.at(x, y).value == 'A' && !this.isEdge(x, y) &&
                (((this.at(x - 1, y - 1).value == 'M' && this.at(x + 1, y + 1).value == 'S')
                    || (this.at(x - 1, y - 1).value == 'S' && this.at(x + 1, y + 1).value == 'M')) &&
                    ((this.at(x + 1, y - 1).value == 'M' && this.at(x - 1, y + 1).value == 'S')
                        || (this.at(x + 1, y - 1).value == 'S' && this.at(x - 1, y + 1).value == 'M'))) ? 1 : 0
            , 0), 0)
    }

    findAdjacentChars(chars, currentPosition, direction) {
        if (this.at(currentPosition.x, currentPosition.y).value != chars[0]) return false;
        if (chars.length == 1) return true;

        let nextPosition = { x: currentPosition.x, y: currentPosition.y };
        nextPosition.x -= direction == Direction.WEST || direction == Direction.NORTH_WEST || direction == Direction.SOUTH_WEST ? 1 : 0;
        nextPosition.x += direction == Direction.EAST || direction == Direction.NORTH_EAST || direction == Direction.SOUTH_EAST ? 1 : 0;
        nextPosition.y -= direction == Direction.NORTH || direction == Direction.NORTH_EAST || direction == Direction.NORTH_WEST ? 1 : 0;
        nextPosition.y += direction == Direction.SOUTH || direction == Direction.SOUTH_EAST || direction == Direction.SOUTH_WEST ? 1 : 0;
        if (this.isOutOfBounds(nextPosition.x, nextPosition.y)) return false;

        return this.findAdjacentChars(chars.slice(1), nextPosition, direction);
    }

}