import { toPointsList } from "../../common/geo.js";

export default function run(lines) {
    let points = parsePoints(lines);
    let grid = createGrid(points);

    points.forEach(point => grid[point.x][point.y] += 1);
    
    const part1 = grid.reduce((sum, val) => sum + val.reduce((sum, val) => sum + (val >= 2 ? 1 : 0), 0), 0);

    points = parsePoints(lines, true);
    grid = createGrid(points);

    points.forEach(point => grid[point.x][point.y] += 1);

    const part2 = grid.reduce((sum, val) => sum + val.reduce((sum, val) => sum + (val >= 2 ? 1 : 0), 0), 0);

    return {
        part1: part1,
        part2: part2,
    }
}

function createGrid(points) {
    const maxX = Math.max(...points.map(p => p.x));
    const maxY = Math.max(...points.map(p => p.y));
    const grid = new Array(maxX + 1).fill();
    for (let x = 0; x < grid.length; x++) {
        grid[x] = new Array(maxY + 1).fill(0);
    }
    return grid;
}

function parsePoints(lines, includeDiagonal = false) {
    return lines.flatMap(line => {
        const { x1, y1, x2, y2 } = line.match(/(?<x1>(\d+)),(?<y1>(\d+)) -> (?<x2>(\d+)),(?<y2>(\d+))/).groups;
        if (!includeDiagonal && x1 != x2 && y1 != y2) {
            return [];
        }
        return toPointsList({ x: +x1, y: +y1 }, { x: +x2, y: +y2 });
    });
}