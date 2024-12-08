import { Grid } from "./model/grid";
import Position from "./model/position";

export default function run(input) {
    let grid = new Grid(input.map(l => l.split('')));
    let total = new Set();
    grid.rows().forEach(r => r.forEach(position => {
        if (position.value !== '.') {
            grid.find(position.value).forEach(otherPosition => {
                if (position.equals(otherPosition)) return;
                let deltaX = otherPosition.x - position.x;
                let deltaY = otherPosition.y - position.y;
                let antinode = grid.at(new Position(position.x - deltaX, position.y - deltaY));
                if (antinode) {
                    total.add(antinode);
                };
            });
        }
    }));
    return total.size;
}