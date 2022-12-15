export default function run(input) {
    const rocks = input.flatMap(lineParts => {
        return parseLineParts(lineParts);
    });
    const grid = fillGrid(rocks);

    return {
        part1: dropSand(grid)
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
        } else {
            grid[y][x].isBlocked = true;
            sandCount++;
            x = 500; y = 0;
        }
    }
}

function fillGrid(rockPositions) {
    const maxX = Math.max(...rockPositions.map(p => p.x));
    const maxY = Math.max(...rockPositions.map(p => p.y));

    const grid = new Array(maxY + 1);
    for (let y = 0; y < grid.length; y++) {
        grid[y] = new Array(maxX + 1);
        for (let x = 0; x <= maxX; x++) {
            grid[y][x] = new Cell();
        }
    }
    rockPositions.forEach(rock => {
        grid[rock.y][rock.x].isBlocked = true;
    });
    return grid;
}

function isBlocked(grid, x, y) {
    return grid[y][x].isBlocked;
}

function parseLineParts(lineParts) {
    return lineParts.split(' -> ')
                            .flatMap((part, index, parts) => {
                                if (!parts[index + 1]) {
                                    return null;
                                };
                                return allPointsFrom(parsePoint(part), 
                                                                parsePoint(parts[index + 1]));
                            })
                            .filter(part => part);
}

function allPointsFrom(begin, end) {
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

class Cell {
    isBlocked = false;
}