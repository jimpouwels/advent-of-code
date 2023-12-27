import Logger from "../../common/logger";

let logger = Logger.getLogger('2023-day13');

export default function run(input, allowSmudge) {
    let grids = parse(input);
    let total = 0;

    grids.forEach(grid => {
        let subTotal = 0;
        let verticalMirror = getMatch(grid, allowSmudge, false);
        if (verticalMirror.count > 0) {
            subTotal = (verticalMirror.index * 100);
        } 
        if (verticalMirror.count == 0 || !verticalMirror.hasSmudge) {
            let horizontalMirror = getMatch(grid, allowSmudge, true);
            if (horizontalMirror.count > 0 || (verticalMirror.count > 0 && verticalMirror.hasSmudge)) {
                subTotal = horizontalMirror.index;
            }
        }
        total += subTotal;
    });
    return total;
}

function getMatch(grid, allowSmudge, horizontal = false) {
    let matches2 = [];
    let endHigh = horizontal ? grid[0].length : grid.length;
    for (let i = 0; i < endHigh; i++) {
        let gridCopy = grid.map(k => [...k]);
        let match = new Match();
        let leftIndex = i;
        let rightIndex = i+1;
        let fixedSmudges = 0;

        let end = horizontal ? grid[0].length : grid.length;
        while (leftIndex >= 0 && rightIndex < end) {
            let equals = false;

            let leftArr = horizontal ? gridCopy.map(g => g[leftIndex]) : gridCopy[leftIndex];
            let rightArr = horizontal ? gridCopy.map(g => g[rightIndex]) : gridCopy[rightIndex];

            if (!allowSmudge || fixedSmudges > 0) {
                equals = equal(leftArr, rightArr);
            } else {
                if (!equal(leftArr, rightArr)) {
                    fixedSmudges++;
                }
                equals = equalsOffByOne(leftArr, rightArr);
            }
            if (!equals) {
                match.count = 0;
                break;
            } else {
                match.count++;
                match.index = i + 1
            }
            leftIndex--;
            rightIndex++;
        }
        if (fixedSmudges > 0) {
            match.hasSmudge = true;
        }
        matches2.push(match);
    }
    let max2 = new Match();
    matches2.forEach(m => {
        if (!m.hasSmudge && max2.hasSmudge) {
            return;
        }
        if (m.hasSmudge && !max2.hasSmudge && m.count > 0) {
            max2 = m;
        } else if (m.hasSmudge && max2.hasSmudge && m.count > max2.count) {
            max2 = m;
        } else if (m.count > max2.count) {
            max2 = m;
        }
    });
    return max2;
}

class Match {
    count = 0;
    index = 0;
    hasSmudge = false;
}

function parse(input) {
    return input.split('\n\n').map(grid => grid.split('\n').map(l => l.split('')));
}

function equal(arr1, arr2) {
    return arr1.every((k, i) => k === arr2[i]);
}

function equalsOffByOne(arr1, arr2) {
    let errorCount = 0;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        arr2[i] = arr1[i];
        errorCount++;
      }
      if (errorCount > 1) return false;
    }
    return true;
}