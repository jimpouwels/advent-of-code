import { Grid } from "./model/grid";
import { Direction } from "./model/direction";

const directions = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST];

export function part1(input) {
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
    return seen.size;
}

export function part2(input) {
    let grid = new Grid(input.map(l => l.split('')));
    let startPosition = grid.find('^');
    let infinitePaths = 0;
    grid.data.forEach((l, extraObstructionY) => l.forEach((_, extraObstructionX) => {
        let seen = new Map();
        let directionIndex = 0;
        grid.move(startPosition.clone(), directions[directionIndex],
            (newPosition, currentDirection) => {
                let seenPosition = seen.get(newPosition);
                if (seenPosition) {
                    if (seenPosition.has(currentDirection)) {
                        infinitePaths++;
                        return false;
                    }
                    seenPosition.add(currentDirection);
                }
                else {
                    seen.set(newPosition, new Set([currentDirection]));
                }
                return true;
            }, (newPosition, changeDirectionCallback) => {
                if (newPosition.value == '#' || newPosition.x == extraObstructionX && newPosition.y == extraObstructionY) {
                    changeDirectionCallback(directions[++directionIndex % directions.length]);
                    return true;
                }
                return false;
            });
    }));
    return infinitePaths;
}