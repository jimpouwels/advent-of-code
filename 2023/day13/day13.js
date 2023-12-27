import Logger from "../../common/logger";

let logger = Logger.getLogger('2023-day13');

export default function run(input, allowedSmudges) {
    let grids = parse(input);
    let total = 0;

    grids.forEach(grid => {
        let subTotal = 0;
        let verticalMirror = getMatch(grid, allowedSmudges, Direction.Vertical);
        subTotal = verticalMirror.index * 100;
        
        if (!verticalMirror.hasSmudge) {
            let horizontalMirror = getMatch(grid, allowedSmudges, Direction.Horizontal);
            if (horizontalMirror.count > 0) {
                subTotal = horizontalMirror.index;
            }
        }
        total += subTotal;
    });
    return total;
}

function getMatch(grid, allowedSmudges, direction) {
    let max = new Match();
    let directionLimit = direction === Direction.Horizontal ? grid[0].length : grid.length;
    for (let i = 0; i < directionLimit; i++) {
        let remainingSmudges = allowedSmudges;
        let gridCopy = grid.map(k => [...k]);
        let match = new Match();
        let leftIndex = i;
        let rightIndex = i+1;

        let end = direction === Direction.Horizontal ? grid[0].length : grid.length;
        while (leftIndex >= 0 && rightIndex < end) {
            let leftArr = direction === Direction.Horizontal ? gridCopy.map(g => g[leftIndex]) : gridCopy[leftIndex];
            let rightArr = direction === Direction.Horizontal ? gridCopy.map(g => g[rightIndex]) : gridCopy[rightIndex];

            remainingSmudges -= getDiffCount(leftArr, rightArr);
            
            if (remainingSmudges < 0) {
                match.count = 0;
                break;
            } else {
                match.count++;
                match.index = i + 1
                match.hasSmudge = remainingSmudges < allowedSmudges;
            }
            leftIndex--;
            rightIndex++;
        }
        if (match.hasSmudge && match.count > 0 || (!max.hasSmudge && match.count > max.count)) {
            max = match;
        }
    }
    return max;
}

const Direction = {
    Horizontal: 'horizontal',
    Vertical: 'vertical'
}

class Match {
    count = 0;
    index = 0;
    hasSmudge = false;
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