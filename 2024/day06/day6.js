import { Grid } from "./model/grid";
import { Direction } from "./model/direction";
import Position from "./model/position";

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
    return grid.data.reduce((sum, l) => sum + l.reduce((sum, tryPos) => {
        let seen = new Map();
        let directionIndex = 0;
        let replacePosition = grid.at(new Position(tryPos.x, tryPos.y));
        if (replacePosition.value == '#' || replacePosition.value == '^') {
            return sum;
        }
        grid.move(startPosition.clone(), directions[directionIndex],
            (currentPosition, currentDirection) => {
                let seenPosition = seen.get(currentPosition);
                if (seenPosition) {
                    if (seenPosition.has(currentDirection)) {
                        sum += 1;
                        return false;
                    }
                    seenPosition.add(currentDirection);
                } else {
                    seen.set(currentPosition, new Set([currentDirection]));
                }
                return true;
            }, (nextPosition, changeDirectionCallback) => {
                if (nextPosition.value == '#' || nextPosition.x == tryPos.x && nextPosition.y == tryPos.y) {
                    changeDirectionCallback(directions[++directionIndex % directions.length]);
                    return true;
                }
                return false;
            });
        return sum;
    }, 0), 0);
}