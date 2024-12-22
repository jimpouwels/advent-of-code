import { AllDirections } from "../../../common/grid/direction";
import Grid from "../../../common/grid/grid";

export class ChristmasGrid extends Grid {

    findWordCount(word) {
        return this.data.reduce((sum, line, y) =>
            sum + line.reduce((sum, _, x) => sum + AllDirections.filter(direction =>
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

        let nextPosition = this.next(currentPosition, direction);
        if (!nextPosition) return false;
        return this.findAdjacentChars(chars.slice(1), nextPosition, direction);
    }

}