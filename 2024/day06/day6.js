import { Grid } from "./model/grid";
import { Direction } from "./model/direction";

export default function run(input) {
    let grid = new Grid(input.map(l => l.split('')));
    let start = grid.find('^');
    let visited = new Set();
    grid.moveUntil(start, Direction.NORTH, (currentPosition, currentDirection, nextPosition, changeDirectionCallback) => {
        visited.add(currentPosition);
        if (nextPosition.value == '#') {
            switch (currentDirection) {
                case Direction.NORTH:
                    changeDirectionCallback(Direction.EAST);
                    break;
                case Direction.EAST:
                    changeDirectionCallback(Direction.SOUTH);
                    break;
                case Direction.SOUTH:
                    changeDirectionCallback(Direction.WEST);
                    break;
                case Direction.WEST:
                    changeDirectionCallback(Direction.NORTH);
                    break;
            }
        }
    }, (_) => {
        return false;
    });
    return visited.size + 1;
}