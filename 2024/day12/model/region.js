export default class Region {
    plots = [];
    perimeter = 0;

    has(plot) {
        return this.plots.some(p => p.x == plot.x && p.y == plot.y);
    }

    add(plot) {
        this.plots.push(plot);
    }

    sides() {
        let sides = 0;
        let handledYs = new Set();
        let handledXs = new Set();
        this.plots.forEach(p => {
            let previousHasAbove = true;
            let previousHasBelow = true;
            let previousX = p.x;
            if (!handledYs.has(p.y)) {
                this.plots.filter(o => o.y == p.y).sort((a, b) => a.x - b.x).forEach(o => {
                    let hasAbove = this.plots.some(n => n.x == o.x && n.y == o.y - 1);
                    let hasBelow = this.plots.some(n => n.x == o.x && n.y == o.y + 1);
                    if (!hasAbove && previousHasAbove || (!hasAbove && Math.abs(previousX - o.x) > 1)) {
                        sides++;
                    }
                    if (!hasBelow && previousHasBelow || (!hasBelow && Math.abs(previousX - o.x) > 1)) {
                        sides++;
                    }
                    previousHasAbove = hasAbove;
                    previousHasBelow = hasBelow;
                    previousX = o.x;
                });
            }
            let previousHasLeft = true;
            let previousHasRight = true;
            let previousY = p.y;
            if (!handledXs.has(p.x)) {
                this.plots.filter(o => o.x == p.x).sort((a, b) => a.y - b.y).forEach(o => {
                    let hasLeft = this.plots.some(n => n.y == o.y && n.x == o.x - 1);
                    let hasRight = this.plots.some(n => n.y == o.y && n.x == o.x + 1);
                    if (!hasLeft && previousHasLeft || (!hasLeft && (Math.abs(previousY - o.y) > 1))) {
                        sides++
                    };
                    if (!hasRight && previousHasRight || (!hasRight && Math.abs(previousY - o.y) > 1)) {
                        sides++;
                    }
                    previousHasLeft = hasLeft;
                    previousHasRight = hasRight;
                    previousY = o.y;
                });
            }
            handledYs.add(p.y);
            handledXs.add(p.x);
        });
        return sides;
    }

    priceByPerimeter() {
        return this.plots.length * this.perimeter;
    }

    priceBySides() {
        return this.plots.length * this.sides();
    }
}
