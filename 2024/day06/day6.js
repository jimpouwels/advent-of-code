import { Grid } from "./model/grid";
import { Direction } from "./model/direction";

const directions = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST];

export default function run(input) {
    let grid = new Grid(input.map(l => l.split('')));
    let start = grid.find('^');
    let visited = new Set();
    let directionIndex = 0;
    grid.moveUntil(start, directions[0], (currentPosition, nextPosition, changeDirectionCallback) => {
        visited.add(currentPosition);
        if (nextPosition.value == '#')
            changeDirectionCallback(directions[++directionIndex % directions.length]);
    }, (_) => {
        return false;
    });
    return visited.size + 1;
}