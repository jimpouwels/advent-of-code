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
                let antinode = grid.at(position.x - deltaX, position.y - deltaY);
                while (antinode) {
                    total.add(antinode);
                    antinode = anyDistance ? grid.at(antinode.x - deltaX, antinode.y - deltaY) : null;
                }
            });
        }
    }));
    return total.size;
}