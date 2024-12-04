import { Grid } from "./model/grid";

export default function run(lines) {
    let grid = new Grid(lines.map(l => l.split('')));

    return {
        part1: grid.findWordCount("XMAS"),
        part2: grid.findX_MASCount()
    }
}