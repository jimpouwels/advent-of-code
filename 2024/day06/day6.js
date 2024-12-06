import { Grid } from "./model/grid";
import { Direction } from "./model/direction";
import Position from "./model/position";
import Logger from "../../common/logger";

const directions = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST];

export default function run(input) {
    let grid = new Grid(input.map(l => l.split('')));
    let startPosition = grid.find('^');
    let visited = new Set();
    let directionIndex = 0;
    new Grid(input.map(l => l.split(''))).move(startPosition.clone(), directions[directionIndex],
        (newPosition) => {
            visited.add(newPosition);
            return true;
        }, (newPosition, changeDirectionCallback) => {
            if (newPosition.value == '#') {
                changeDirectionCallback(directions[++directionIndex % directions.length]);
                return true;
            }
            return false;
        });

    let looping = 0;
    for (let y = 0; y < grid.height(); y++) {
        for (let x = 0; x < grid.width(); x++) {
            let visitedPart2 = new Map();
            directionIndex = 0;
            grid.move(startPosition.clone(), directions[directionIndex],
                (newPosition, currentDirection) => {
                    let ex = visitedPart2.get(newPosition);
                    if (ex) {
                        if (ex && ex.has(currentDirection)) {
                            looping++;
                            return false;
                        }
                        ex.add(currentDirection);
                    }
                    else {
                        visitedPart2.set(newPosition, new Set([currentDirection]));
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
        part1: visited.size,
        part2: looping
    }
}