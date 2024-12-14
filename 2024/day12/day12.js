import Grid from "./model/grid";
import Region from "./model/region";

export default function run(input) {
    let grid = new Grid(input);
    let regions = [];
    grid.rows().forEach(row => {
        row.forEach(plot => {
            if (regions.some(r => r.has(plot))) return;
            regions.push(detectRegion(grid, new Region(), plot));
        });
    })
    return {
        part1: regions.reduce((sum, r) => sum + r.priceByPerimeter(), 0),
        part2: regions.reduce((sum, r) => sum + r.priceBySides(), 0)
    };
}

function detectRegion(grid, region, currentPlot) {
    if (!currentPlot) { region.perimeter++; return region; }
    if (region.has(currentPlot)) return region;
    region.add(currentPlot);

    detectRegion(grid, region, grid.left(currentPlot, (left) => left.value == currentPlot.value));
    detectRegion(grid, region, grid.right(currentPlot, (right) => right.value == currentPlot.value));
    detectRegion(grid, region, grid.above(currentPlot, (above) => above.value == currentPlot.value));
    detectRegion(grid, region, grid.below(currentPlot, (below) => below.value == currentPlot.value));

    return region;
}
