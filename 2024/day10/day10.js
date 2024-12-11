import { Grid } from "./model/grid";

export default function run(input) {
    let grid = new Grid(input.map(l => l.split('')));
    return grid.find(0).reduce((sum, val) => sum + (findPathsFrom(grid, val).size), 0);
}

function findPathsFrom(grid, position) {
    let positions = new Set();
    if (!position) return positions;
    if (position.value == 9) {
        positions.add(position);
        return positions;
    }
    positions = new Set([...positions, ...(findPathsFrom(grid, grid.left(position, (v) => !isNaN(v.value) && v.value - position.value == 1)))]);
    positions = new Set([...positions, ...(findPathsFrom(grid, grid.right(position, (v) => !isNaN(v.value) && v.value - position.value == 1)))]);
    positions = new Set([...positions, ...(findPathsFrom(grid, grid.above(position, (v) => !isNaN(v.value) && v.value - position.value == 1)))]);
    positions = new Set([...positions, ...(findPathsFrom(grid, grid.below(position, (v) => !isNaN(v.value) && v.value - position.value == 1)))]);
    return positions;
}