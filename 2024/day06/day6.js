import { Grid } from "./model/grid";
import { Direction } from "./model/direction";
import Position from "./model/position";
import Logger from "../../common/logger";

const logger = Logger.getLogger('2024-day6');
const directions = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST];

export default function run(input) {
    let grid = new Grid(input.map(l => l.split('')));
    let startPosition = grid.find('^');
    let visited = new Set();
    let directionIndex = 0;
    new Grid(input.map(l => l.split(''))).move(startPosition.clone(), directions[directionIndex],
        (newPosition) => {
            visited.add(newPosition);
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
            let tryPos = grid.at(new Position(x, y));
            if (tryPos.value == '#' || tryPos.value == '^') continue;
            let tryOriginalValue = tryPos.value;
            tryPos.value = '#';
            let visitedPart2 = new Map();
            directionIndex = 0;
            grid.move(startPosition.clone(), directions[directionIndex],
                (newPosition, currentDirection) => {
                    let ex = visitedPart2.get(newPosition);
                    if (ex)
                        ex.add(currentDirection);
                    else {
                        let newSet = new Set();
                        newSet.add(currentDirection);
                        visitedPart2.set(newPosition, newSet);
                    }
                }, (newPosition, changeDirectionCallback) => {
                    if (newPosition.value == '#') {
                        changeDirectionCallback(directions[++directionIndex % directions.length]);
                        return true;
                    }
                    return false;
                }, (currentPosition, currentDirection) => {
                    let ex = visitedPart2.get(currentPosition);
                    if (ex && ex.has(currentDirection)) {
                        looping++;
                        return false;
                    }
                    return true;
                });
            tryPos.value = tryOriginalValue;
        }
    }
    return {
        part1: visited.size,
        part2: looping
    }
}