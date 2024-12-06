import { Grid } from "./model/grid";
import { Direction } from "./model/direction";

const directions = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST];

export default function run(input) {
    let grid = new Grid(input.map(l => l.split('')));
    let startPosition = grid.find('^');
    let visited = new Set();
    let directionIndex = 0;
    grid.moveUntilOutside(startPosition, directions[directionIndex], (currentPosition, nextPosition, changeDirectionCallback) => {
        visited.add(currentPosition);
        if (nextPosition.value == '#')
            changeDirectionCallback(directions[++directionIndex % directions.length]);
    });
    return visited.size + 1;
}