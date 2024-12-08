import { Grid } from "./model/grid";

export default function run(input, anyDistance = false) {
    let grid = new Grid(input.map(l => l.split('')));
    return grid.rows().reduce((antinodes, r) => {
        r.filter(p => p.value !== '.').forEach(position => {
            grid.find(position.value).forEach(otherPosition => {
                if (position.equals(otherPosition)) return;
                if (anyDistance) {
                    antinodes.add(otherPosition);
                }
                let deltaX = otherPosition.x - position.x;
                let deltaY = otherPosition.y - position.y;
                let nextAntinode = position;
                while (true) {
                    nextAntinode = grid.at(nextAntinode.x - deltaX, nextAntinode.y - deltaY);
                    if (nextAntinode) antinodes.add(nextAntinode); else break;
                    if (!anyDistance) break;
                }
            });
        })
        return antinodes;
    }, new Set()).size;
}