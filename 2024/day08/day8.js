import { Grid } from "./model/grid";

export default function run(input, anyDistance = false) {
    let grid = new Grid(input.map(l => l.split('')));
    let total = new Set();
    grid.rows().forEach(r => r.forEach(position => {
        if (position.value !== '.') {
            grid.find(position.value).forEach(otherPosition => {
                if (position.equals(otherPosition)) return;
                if (anyDistance) {
                    total.add(otherPosition);
                }
                let deltaX = otherPosition.x - position.x;
                let deltaY = otherPosition.y - position.y;
                let nextAntinode = grid.at(position.x - deltaX, position.y - deltaY);
                while (nextAntinode) {
                    total.add(nextAntinode);
                    nextAntinode = anyDistance ? grid.at(nextAntinode.x - deltaX, nextAntinode.y - deltaY) : null;
                }
            });
        }
    }));
    return total.size;
}