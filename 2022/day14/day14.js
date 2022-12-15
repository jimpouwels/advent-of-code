export default function run(input) {
    const rocks = input.flatMap(lineParts => {
        return parseLineParts(lineParts);
    });
    const grid1 = fillGrid(rocks);
    const part1 = dropSand(grid1);

    const grid2 = fillGrid(rocks, true);
    const part2 = dropSand(grid2);
    return {
        part1: part1,
        part2: part2
    };
}

function dropSand(grid) {
    let sandCount = 0;
    let x = 500; let y = 0;
    while (true) {
        if (y === grid.length - 1) {
            return sandCount;
        } else if (!isBlocked(grid, x, y + 1)) {
            y++;
        } else if (!isBlocked(grid, x - 1, y + 1)) {
            y++; x--;
        } else if (!isBlocked(grid, x + 1, y + 1)) {
            y++; x++;
        } else if (isBlocked(grid, x, y)) {
            return sandCount;
        } else {
            grid[y][x].isBlocked = true;
            sandCount++;
            x = 500; y = 0;
        }
    }
}

function fillGrid(rockPositions, addBottom = false) {
    const maxX = Math.max(...rockPositions.map(p => p.x)) + 1000;
    const maxY = Math.max(...rockPositions.map(p => p.y));

    const grid = new Array(maxY + 1);
    for (let y = 0; y < grid.length; y++) {
        grid[y] = new Array(maxX + 1);
        for (let x = 0; x <= maxX; x++) {
            grid[y][x] = {};
        }
    }
    rockPositions.forEach(rock => {
        grid[rock.y][rock.x].isBlocked = true;
    });
    if (addBottom) {
        grid.push(new Array(maxX + 1));
        grid.push(new Array(maxX + 1));
        for (let y = grid.length - 2; y < grid.length; y++) {
            for (let x = 0; x <= maxX; x++) {
                grid[y][x] = {};
            }
        }
        for (let x = 0; x <= maxX; x++) {
            grid[grid.length - 1][x].isBlocked = true
        }
    }
    return grid;
}

function isBlocked(grid, x, y) {
    if (!grid[y][x]) {
        console.log(grid[0].length, x, y);
    }
    return grid[y][x].isBlocked;
}

function parseLineParts(lineParts) {
    return lineParts.split(' -> ')
                            .flatMap((part, index, parts) => {
                                if (!parts[index + 1]) {
                                    return null;
                                };
                                return toPoints(parsePoint(part), 
                                                                parsePoint(parts[index + 1]));
                            })
                            .filter(part => part);
}

function toPoints(begin, end) {
    const allPoints = [];
    const line = [begin, end].sort((a, b) => (a.x - b.x) + (a.y - b.y));

    for (let x = line[0].x; x <= line[1].x; x++) {
        for (let y = line[0].y; y <= line[1].y; y++) {
            allPoints.push({ x: x, y: y });
        }
    }
    return allPoints;
}

function parsePoint(pointString) {
    const parts = pointString.split(',')
    return  { x: parseInt(parts[0]), y: parseInt(parts[1])};
}