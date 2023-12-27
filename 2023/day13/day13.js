import Logger from "../../common/logger";
import { Direction } from "./direction";
import Match from "./match";

let logger = Logger.getLogger('2023-day13');

export default function run(input, allowedSmudges) {
    return parse(input).reduce((sum, grid) => {
        let subTotal = 0;
        let verticalMirror = getMatch(grid, allowedSmudges, Direction.Vertical);
        subTotal = verticalMirror.index * 100;
        
        if (!verticalMirror.hasSmudge) {
            let horizontalMirror = getMatch(grid, allowedSmudges, Direction.Horizontal);
            if (horizontalMirror.count > 0) {
                subTotal = horizontalMirror.index;
            }
        }
        return sum += subTotal;
    }, 0);
}

function getMatch(pattern, allowedSmudges, direction) {
    let max = new Match();

    let grid = [];
    if (direction == Direction.Horizontal) {
        pattern[0].forEach((_, i) => grid.push(pattern.map(g1 => g1[i]))); 
    } else {
        grid = pattern;
    }
    startPosLoop:
    for (let i = 0; i < grid.length; i++) {
        let remainingSmudges = allowedSmudges;
        let match = new Match();
        let from = i;
        let to = i+1;

        while (from >= 0 && to < grid.length) {
            remainingSmudges -= getDiffCount(grid[from], grid[to]);
            
            if (remainingSmudges < 0) {
                match.count = 0;
                continue startPosLoop;
            } else {
                match.count++;
                match.index = i + 1
                match.hasSmudge = remainingSmudges < allowedSmudges;
                from--, to++;
            }
        }
        if (match.hasSmudge && match.count > 0 || (!max.hasSmudge && match.count > max.count)) {
            max = match;
        }
    }
    return max;
}

function parse(input) {
    return input.split('\n\n').map(grid => grid.split('\n').map(l => l.split('')));
}

function getDiffCount(arr1, arr2) {
    let errorCount = 0;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        errorCount++;
      }
    }
    return errorCount;
}