import { Grid } from "./model/grid";

export default function run(input) {
    let grid = new Grid(input.map(l => l.split('')));
    let total = new Set();
    grid.rows().forEach(r => r.forEach(position => {
        if (position.value !== '.') {
            grid.find(position.value).forEach(otherPosition => {
                if (position.equals(otherPosition)) return;
                let antinode = grid.at(position.x - (otherPosition.x - position.x), position.y - (otherPosition.y - position.y));
                if (antinode) {
                    total.add(antinode);
                };
            });
        }
    }));
    return total.size;
}