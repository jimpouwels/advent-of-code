export default class Region {
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
