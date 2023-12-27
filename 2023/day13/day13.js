import Logger from "../../common/logger";

let logger = Logger.getLogger('2023-day13');

export default function run(input, allowSmudge) {
    let grids = parse(input);
    let total = 0;

    let gridToMatches = [];
    grids.forEach(grid => {
        let matches1 = [];
        let subTotal = 0;
        for (let i = 0; i < grid.length; i++) {
            let gridCopy = grid.map(k => [...k]);

            let match = new Match();
            let topIndex = i;
            let bottomIndex = i + 1;
            let fixedSmudges = 0;
            while (topIndex >= 0 && bottomIndex < grid.length) {
                let equals = false;
                if (!allowSmudge || fixedSmudges > 0) {
                    equals = equal(gridCopy[topIndex], gridCopy[bottomIndex])
                } else {
                    if (!equal(gridCopy[topIndex], gridCopy[bottomIndex])) {
                        fixedSmudges++;
                    }
                    equals = equalsOffByOne(gridCopy[topIndex], gridCopy[bottomIndex])
                }
                if (!equals) {
                    match.count = 0;
                    break;
                } else {
                    match.index = i + 1;
                    match.count++;
                }
                topIndex--;
                bottomIndex++;
            }
            if (fixedSmudges > 0) {
                match.hasSmudge = true;
            }
            matches1.push(match);
        }
        // console.log('vertical', matches1);
        let max1 = new Match();
        matches1.forEach(m => {
            if (!m.hasSmudge && max1.hasSmudge) {
                return;
            }
            if (m.hasSmudge && !max1.hasSmudge && m.count > 0) {
                max1 = m;
            } else if (m.hasSmudge && max1.hasSmudge && m.count > max1.count) {
                max1 = m;
            } else if (m.count > max1.count) {
                max1 = m;
            }
        });
        if (max1.count > 0) {
            gridToMatches.push({grid: grid, direction: 'vertical', match: max1.index});
            subTotal = (max1.index * 100);
        } 
        if (max1.count == 0 || !max1.hasSmudge) {
            let matches2 = [];
            for (let i = 0; i < grid[0].length; i++) {
                let gridCopy = grid.map(k => [...k]);
                let match = new Match();
                let leftIndex = i;
                let rightIndex = i+1;
                let fixedSmudges = 0;
                while (leftIndex >= 0 && rightIndex < grid[0].length) {
                    let equals = false;
                    if (!allowSmudge || fixedSmudges > 0) {
                        equals = equal(gridCopy.map(g => g[leftIndex]), gridCopy.map(g => g[rightIndex]));
                    } else {
                        if (!equal(gridCopy.map(g => g[leftIndex]), gridCopy.map(g => g[rightIndex]))) {
                            fixedSmudges++;
                        }
                        equals = equalsOffByOne(gridCopy.map(g => g[leftIndex]), gridCopy.map(g => g[rightIndex]))
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
            // console.log('horizontal', matches2);
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
            if (max2.count > 0 || (max1.count > 0 && max1.hasSmudge)) {
                gridToMatches.push({grid: grid, direction: 'horizontal' , match: max2.index});
                subTotal = max2.index;
            }
        }
        total += subTotal;
    });
    return total;
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