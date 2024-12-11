import { Grid } from "./model/grid";

export default function run(input) {
    let grid = new Grid(input.map(l => l.split('')));
    return {
        part1: grid.find(0).reduce((sum, val) => sum + (findPathsFromP1(grid, val).size), 0),
        part2: grid.find(0).reduce((sum, val) => sum + (findPathsFromP2(grid, val).length), 0)
    }
}

function findPathsFromP1(grid, position,) {
    let positions = new Set();
    if (!position) return positions;
    if (position.value == 9) {
        positions.add(position);
        return positions;
    }
    positions = new Set([...positions, ...(findPathsFromP1(grid, grid.left(position, (v) => !isNaN(v.value) && v.value - position.value == 1)))]);
    positions = new Set([...positions, ...(findPathsFromP1(grid, grid.right(position, (v) => !isNaN(v.value) && v.value - position.value == 1)))]);
    positions = new Set([...positions, ...(findPathsFromP1(grid, grid.above(position, (v) => !isNaN(v.value) && v.value - position.value == 1)))]);
    positions = new Set([...positions, ...(findPathsFromP1(grid, grid.below(position, (v) => !isNaN(v.value) && v.value - position.value == 1)))]);
    return positions;
}

function findPathsFromP2(grid, position,) {
    let positions = [];
    if (!position) return positions;
    if (position.value == 9) {
        positions.push(position);
        return positions;
    }
    positions = [...positions, ...(findPathsFromP2(grid, grid.left(position, (v) => !isNaN(v.value) && v.value - position.value == 1)))];
    positions = [...positions, ...(findPathsFromP2(grid, grid.right(position, (v) => !isNaN(v.value) && v.value - position.value == 1)))];
    positions = [...positions, ...(findPathsFromP2(grid, grid.above(position, (v) => !isNaN(v.value) && v.value - position.value == 1)))];
    positions = [...positions, ...(findPathsFromP2(grid, grid.below(position, (v) => !isNaN(v.value) && v.value - position.value == 1)))];
    return positions;
}