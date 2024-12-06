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
            let visitedPart2 = new Set();
            directionIndex = 0;
            if (x == 0) {
                console.log(x, y);
            }
            grid.move(startPosition.clone(), directions[directionIndex],
                (newPosition) => {
                    visitedPart2.add(newPosition);
                }, (newPosition, changeDirectionCallback) => {
                    if (newPosition.value == '#') {
                        changeDirectionCallback(directions[++directionIndex % directions.length]);
                        return true;
                    }
                    return false;
                }, (currentPosition, currentDirection) => {
                    if (Array.from(visitedPart2).find(v => v.equals(currentPosition) && v.hasDirection(currentDirection))) {
                        looping++;
                        return false;
                    }
                    return true;
                });
            visitedPart2.forEach(v => v.visitedDirections = []);
            tryPos.value = tryOriginalValue;
        }
    }
    return {
        part1: visited.size,
        part2: looping
    }
}