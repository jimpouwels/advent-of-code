import { Grid } from "./model/grid";

export default function run(input, anyDistance = false) {
    let grid = new Grid(input.map(l => l.split('')));
    return grid.rows().reduce((antinodes, r) => {
        r.filter(p => p.value !== '.').forEach(antenna => {
            grid.find(antenna.value).filter(otherAntenna => !otherAntenna.equals(antenna)).forEach(otherAntenna => {
                if (anyDistance) {
                    antinodes.add(otherAntenna);
                }
                let deltaX = otherAntenna.x - antenna.x;
                let deltaY = otherAntenna.y - antenna.y;
                let nextAntinode = antenna;
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