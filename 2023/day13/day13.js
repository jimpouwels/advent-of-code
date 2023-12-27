import Logger from "../../common/logger";

let logger = Logger.getLogger('2023-day13');

export default function run(input) {
    let grids = parse(input);
    let total = 0;

    let gridToMatches = [];
    grids.forEach(grid => {
        let horizontalMatch = -1;
        // logger.log('NIEUWE');
        let matches1 = [];
        for (let i = 0; i < grid.length; i++) {
            let match = new Match();
            let topIndex = i;
            let bottomIndex = i + 1;
            while (topIndex >= 0 && bottomIndex < grid.length) {
                if (!equals(grid[topIndex], grid[bottomIndex])) {
                    match.count = 0;
                    break;
                } else {
                    match.index = i + 1;
                    match.count++;
                }
                topIndex--;
                bottomIndex++;
            }
            matches1.push(match);
        }
        
        let max1 = new Match();
        matches1.forEach(m => {
            if (m.count > max1.count) {
                max1 = m;
            }
        });
        if (max1.count > 0) {
            // logger.log('MATCH VERTICAL');
            gridToMatches.push({grid: grid, direction: 'vertical', match: max1.index});
            horizontalMatch = (max1.index * 100);
        }
        let matches2 = [];
        let verticalMatch = -1;
        for (let i = 0; i < grid[0].length; i++) {
            let match = new Match();
            let leftIndex = i;
            let rightIndex = i+1;
            while (leftIndex >= 0 && rightIndex < grid[0].length) {
                if (!equals(grid.map(g => g[leftIndex]), grid.map(g => g[rightIndex]))) {
                    match.count = 0;
                    break;
                } else {
                    match.count++;
                    match.index = i + 1
                }
                leftIndex--;
                rightIndex++;
            }
            matches2.push(match);
        }
        let max2 = new Match();
        matches2.forEach(m => {
            if (m.count > max2.count) {
                max2 = m;
            }
        });
        if (max2.count > 0) {
            // logger.log('MATCH HORIZONTAL');
            gridToMatches.push({grid: grid, direction: 'horizontal' , match: max2.index});
            verticalMatch = max2.index;
        }
        if (horizontalMatch == -1 && verticalMatch == -1) {
            logger.log('niks');
            logger.logGrid(grid, (d) => d);
            // total += 1;
        } else {
            total += (horizontalMatch > 0 ? horizontalMatch : 0) + (verticalMatch > 0 ? verticalMatch : 0);
        }
    });
    gridToMatches.forEach(k => {
        // logger.log(k.direction + ', ' + k.match);
        // logger.logGrid(k.grid, (d) => d);
    });
    return total;
}

class Match {
    count = 0;
    index = 0;
}

function parse(input) {
    return input.split('\n\n').map(grid => grid.split('\n').map(l => l.split('')));
}

function equals(arr1, arr2) {
    return arr1.every((k, i) => k === arr2[i]);
}