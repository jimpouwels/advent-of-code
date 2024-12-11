import Grid from "./model/grid";

export default function run(input) {
    let grid = new Grid(input.map(l => l.split('')));
    let results = grid.find(0).map(val => findPathsTo(grid, val, 9));
    return {
        part1: results.reduce((sum, val) => sum + new Set([...val]).size, 0),
        part2: results.reduce((sum, val) => sum + val.length, 0)
    }
}

function findPathsTo(grid, position, end) {
    if (!position) return [];
    if (position.value == end) return [position];
    return [grid.left(position), grid.right(position), grid.above(position), grid.below(position)]
        .filter(p => p && p.value - position.value == 1)
        .flatMap(p => findPathsTo(grid, p, end));
}