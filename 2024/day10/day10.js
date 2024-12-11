import { Grid } from "./model/grid";

export default function run(input) {
    let grid = new Grid(input.map(l => l.split('')));
    let results = grid.find(0).map(val => findPathsFrom(grid, val));
    return {
        part1: results.reduce((sum, val) => sum + new Set([...val]).size, 0),
        part2: results.reduce((sum, val) => sum + val.length, 0)
    }
}

function findPathsFrom(grid, position) {
    if (!position) return [];
    if (position.value == 9) return [position];
    return [grid.left(position), grid.right(position), grid.above(position), grid.below(position)]
        .filter(p => p && !isNaN(p.value) && p.value - position.value == 1)
        .flatMap(p => findPathsFrom(grid, p));
}