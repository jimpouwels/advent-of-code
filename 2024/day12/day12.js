import Grid from "./model/grid";

export default function run(input) {
    let grid = new Grid(input);
    let regions = [];
    grid.rows().forEach((row, y) => {
        row.forEach((plot, x) => {
            if (regions.some(r => r.has(plot)))
                return;
            let region = new Region();
            detectRegion(grid, region, plot)
            regions.push(region);
        });
    })
    return regions.reduce((sum, r) => sum + r.price(), 0);
}

function detectRegion(grid, region, currentPlot) {
    if (region.has(currentPlot)) {
        return;
    }
    region.add(currentPlot);
    let left = grid.left(currentPlot);
    if (left && left.value == currentPlot.value) {
        detectRegion(grid, region, left);
    } else {
        region.perimeter++;
    }
    let right = grid.right(currentPlot);
    if (right && right.value == currentPlot.value) {
        detectRegion(grid, region, right);
    } else {
        region.perimeter++;
    }
    let above = grid.above(currentPlot);
    if (above && above.value == currentPlot.value) {
        detectRegion(grid, region, above);
    } else {
        region.perimeter++;
    }
    let below = grid.below(currentPlot);
    if (below && below.value == currentPlot.value) {
        detectRegion(grid, region, below);
    } else {
        region.perimeter++;
    }
    return region;
}

class Region {
    plots = [];
    perimeter = 0;

    has(plot) {
        return this.plots.some(p => p.x == plot.x && p.y == plot.y);
    }

    add(plot) {
        this.plots.push(plot);
    }

    price() {
        return this.plots.length * this.perimeter;
    }
}

