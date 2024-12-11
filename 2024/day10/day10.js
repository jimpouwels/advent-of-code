import { Grid } from "./model/grid";

export default function run(input) {
    let grid = new Grid(input.map(l => l.split('')));

    let results = grid.find(0).map(val => findPathsFrom(grid, val));
    return {
        part1: results.reduce((sum, val) => sum + new Set([...val]).size, 0),
        part2: results.reduce((sum, val) => sum + val.length, 0)
    }
}

function findPathsFrom(grid, position,) {
    let positions = [];
    if (!position) return positions;
    if (position.value == 9) {
        positions.push(position);
        return positions;
    }
    positions = [...positions, ...(findPathsFrom(grid, grid.left(position, (v) => !isNaN(v.value) && v.value - position.value == 1)))];
    positions = [...positions, ...(findPathsFrom(grid, grid.right(position, (v) => !isNaN(v.value) && v.value - position.value == 1)))];
    positions = [...positions, ...(findPathsFrom(grid, grid.above(position, (v) => !isNaN(v.value) && v.value - position.value == 1)))];
    positions = [...positions, ...(findPathsFrom(grid, grid.below(position, (v) => !isNaN(v.value) && v.value - position.value == 1)))];
    return positions;
}