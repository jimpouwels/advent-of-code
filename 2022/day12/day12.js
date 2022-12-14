import Position from "./position.js";

export default function run(lines) {
    const data = parseInput(lines);
    const part1 = aStar(data.from, data.to, data.grid).getDepth();

    const startingPoints = getAllPossibleStartingPoints(data);
    const part2 = Math.min(...startingPoints.map(from => {
        const destination = aStar(from, data.to, data.grid);
        return destination ? destination.getDepth() : Infinity;
    }));
    return {
        part1: part1,
        part2: part2
    };
}

function aStar(from, to, grid) {
    resetGrid(grid);
    const open = [from];
    const closed = [];

    while (true) {
        const current = open.shift();
        closed.push(current);
        
        if (!current) {
            return;
        }
        if (current == to) {
            return current;
        }
        getNeighbours(current, grid)
            .filter(n => n.elevation - current.elevation < 2)
            .forEach(neighbour => {
                if (closed.includes(neighbour)) {
                    return;
                }
                const newCost = neighbour.getCost(from, to);
                if (newCost <= neighbour.cost || !open.includes(neighbour)) {
                    neighbour.cost = newCost;
                    neighbour.parent = current;
                    if (!open.includes(neighbour)) {
                        open.push(neighbour);
                    }
                }
            });
    }
}

function getNeighbours(currentPosition, grid) {
    const surroundingTiles = [];
    if (currentPosition.x > 0) {
        surroundingTiles.push(grid[currentPosition.y][currentPosition.x - 1]);
    }
    if (currentPosition.x < grid[0].length - 1) {
        surroundingTiles.push(grid[currentPosition.y][currentPosition.x + 1]);
    }
    if (currentPosition.y > 0) {
        surroundingTiles.push(grid[currentPosition.y - 1][currentPosition.x]);
    }
    if (currentPosition.y < grid.length - 1) {
        surroundingTiles.push(grid[currentPosition.y + 1][currentPosition.x]);
    }
    return surroundingTiles;
}

function resetGrid(grid) {
    grid.forEach(row => row.forEach(position => position.reset()));
}

function getAllPossibleStartingPoints(input) {
    return input.grid.flatMap(line => line.filter(position => position.elevation === 0));
}

function parseInput(lines) {
    let from, to;
    const grid = lines.map((line, row) => line.split('').flatMap((char, column) => {
        switch (char) {
            case 'S':
                from = new Position(column, row, 0);
                return from;
            case 'E':
                to = new Position(column, row, 25);
                return to;
            default:
                return new Position(column, row, char.charCodeAt(0) % 97); 
        }
    }));
    return {
        grid: grid,
        from: from,
        to: to
    }
}