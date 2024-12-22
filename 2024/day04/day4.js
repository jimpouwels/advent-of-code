import { ChristmasGrid } from "./model/christmas_grid";

export default function run(lines) {
    let grid = new ChristmasGrid(lines, v => v);
    return {
        part1: grid.findWordCount("XMAS"),
        part2: grid.findX_MASCount()
    }
}