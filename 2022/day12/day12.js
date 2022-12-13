export default function run(lines) {
    const input = parseInput(lines);
    
    return {
        part1: getStepCount(aStar(input.from, input.to, input.grid)),
        part2: 0
    };
}

function aStar(from, to, grid) {
    const open = [from];
    const closed = [];

    while (true) {
        const current = open.shift();
        closed.push(current);

        if (current == to) {
            return current;
        }
        const surroundingTiles = getSurroundingTiles(current, grid);
        for (const surroundingTile of surroundingTiles) {
            if (closed.includes(surroundingTile)) {
                continue;
            }
            const newCost = getCost(from, surroundingTile, to);
            if (newCost <= surroundingTile.cost || !open.includes(surroundingTile)) {
                surroundingTile.cost = newCost;
                surroundingTile.parent = current;
                if (!open.includes(surroundingTile)) {
                    open.push(surroundingTile);
                }
            }
        }
    }
}

function getCost(from, current, to) {
    return getDistanceTo(current, from) + getDistanceTo(current, to);
}

function getDistanceTo(pos1, pos2) {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
}

function getStepCount(found) {
    let stepCount = 0;
    let current = found;
    while (current.parent) {
        stepCount++;
        current = current.parent;
    }
    return stepCount;
}

function getSurroundingTiles(currentPosition, grid) {
    const surroundingTiles = [];
    if (currentPosition.x > 0) {
        const adjacentTile = grid[currentPosition.y][currentPosition.x - 1];
        if (adjacentTile.elevation - currentPosition.elevation < 2) {
            surroundingTiles.push(adjacentTile);
        }
    }
    if (currentPosition.x < grid[0].length - 1) {
        const adjacentTile = grid[currentPosition.y][currentPosition.x + 1];
        if (adjacentTile.elevation - currentPosition.elevation < 2) {
            surroundingTiles.push(adjacentTile);
        }
    }
    if (currentPosition.y > 0) {
        const adjacentTile = grid[currentPosition.y - 1][currentPosition.x];
        if (adjacentTile.elevation - currentPosition.elevation < 2) {
            surroundingTiles.push(adjacentTile);
        }
    }
    if (currentPosition.y < grid.length - 1) {
        const adjacentTile = grid[currentPosition.y + 1][currentPosition.x];
        if (adjacentTile.elevation - currentPosition.elevation < 2) {
            surroundingTiles.push(adjacentTile);
        }
    }
    return surroundingTiles;
}

function parseInput(lines) {
    let from, to;
    const grid = lines.map((line, row) => line.split('').flatMap((char, column) => {
        switch (char) {
            case 'S':
                from = { x: column, y: row, elevation: 0, cost: 0 };
                return from;
            case 'E':
                to = { x: column, y: row, elevation: 25, cost: Infinity };
                return to;
            default:
                return { x: column, y: row, elevation: char.charCodeAt(0) % 97, cost: Infinity }; 
        }
    }));
    return {
        grid: grid,
        from: from,
        to: to
    }
}