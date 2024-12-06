import { Grid } from "./model/grid";
import { Direction } from "./model/direction";

const directions = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST];

export default function run(input) {
    let grid = new Grid(input.map(l => l.split('')));
    let startPosition = grid.find('^');
    let directionIndex = 0;
    let seen = new Set();
    new Grid(input.map(l => l.split(''))).move(startPosition.clone(), directions[directionIndex],
        (newPosition) => {
            seen.add(newPosition);
            return true;
        }, (newPosition, changeDirectionCallback) => {
            if (newPosition.value == '#') {
                changeDirectionCallback(directions[++directionIndex % directions.length]);
                return true;
            }
            return false;
        });
    let part1 = seen.size;

    let part2 = 0;
    for (let y = 0; y < grid.height(); y++) {
        for (let x = 0; x < grid.width(); x++) {
            let seen = new Map();
            directionIndex = 0;
            grid.move(startPosition.clone(), directions[directionIndex],
                (newPosition, currentDirection) => {
                    let ex = seen.get(newPosition);
                    if (ex) {
                        if (ex.has(currentDirection)) {
                            part2++;
                            return false;
                        }
                        ex.add(currentDirection);
                    }
                    else {
                        seen.set(newPosition, new Set([currentDirection]));
                    }
                    return true;
                }, (newPosition, changeDirectionCallback) => {
                    if (newPosition.value == '#' || newPosition.x == x && newPosition.y == y) {
                        changeDirectionCallback(directions[++directionIndex % directions.length]);
                        return true;
                    }
                    return false;
                });
        }
    }
    return {
        part1: part1,
        part2: part2
    }
}