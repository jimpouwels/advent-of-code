export default function run(input) {
    const rocks = input.flatMap(lineParts => parseLineParts(lineParts));
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
        if (y === grid.length - 1 || !isFree(grid, x, y)) {
            return sandCount;
        } else if (isFree(grid, x, y + 1)) {
            y++;
        } else if (isFree(grid, x - 1, y + 1)) {
            y++; x--;
        } else if (isFree(grid, x + 1, y + 1)) {
            y++; x++;
        } else {
            grid[y][x] = 1;
            sandCount++;
            x = 500; y = 0;
        }
    }
}

function fillGrid(rockPositions, addBottom = false) {
    const maxX = Math.max(...rockPositions.map(p => p.x)) + 300;
    const maxY = Math.max(...rockPositions.map(p => p.y));

    const grid = new Array(maxY + 1);
    for (let y = 0; y < grid.length; y++) {
        grid[y] = new Array(maxX + 1).fill(false);
    }
    if (addBottom) {
        grid.push(new Array(maxX + 1).fill(false));
        grid.push(new Array(maxX + 1).fill(true));
    }
    rockPositions.forEach(rock => {
        grid[rock.y][rock.x] = 1;
    });
    return grid;
}

function isFree(grid, x, y) {
    return !grid[y][x];
}

function parseLineParts(lineParts) {
    return lineParts.split(' -> ')
                    .flatMap((part, i, parts) => !parts[i + 1] ? null : toPoints(parsePoint(part), parsePoint(parts[i + 1])))
                    .filter(part => part);
}

function toPoints(...line) {
    const allPoints = [];
    line = line.sort((a, b) => (a.x - b.x) + (a.y - b.y));

    for (let x = line[0].x; x <= line[1].x; x++) {
        for (let y = line[0].y; y <= line[1].y; y++) {
            allPoints.push({ x: x, y: y });
        }
    }
    return allPoints;
}

function parsePoint(pointString) {
    const parts = pointString.split(',')
    return { x: parseInt(parts[0]), y: parseInt(parts[1])};
}