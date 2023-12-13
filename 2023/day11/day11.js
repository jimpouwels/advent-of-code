import Logger from "../../common/logger";
import Position from "./position";

let logger = Logger.getLogger('2023-day11');

export default function run(lines) {
    let space = parseSpace(lines.map(l => l.split('')));
    
    let part1 = sumDistancesBetweenGalaxies(space, 2);
    let part2 = sumDistancesBetweenGalaxies(space, 1000000);
    return {
        part1: part1,
        part2: part2
    }
}

function sumDistancesBetweenGalaxies(space, expandCount) {
    let expandXIndices = getEmptyColumns(space);
    let expandYIndices = getEmptyRows(space);
    let galaxies = space.flatMap(x => x.filter(y => y.isGalaxy));
    return galaxies.reduce((sum, g1, i) => i >= galaxies.length - 1 ? sum : 
                                (sum + galaxies.reduce((sum, g2, j) => j <= i ? sum :
                                    (sum + ((Math.abs(g1.x - g2.x) + (Math.abs(g1.y - g2.y)))) +
                                    expandXIndices.filter(x => (g1.x < x && g2.x > x) || (g2.x < x && g1.x > x)).length * (expandCount - 1) +
                                    expandYIndices.filter(y => (g1.y < y && g2.y > y) || (g2.y < y && g1.y > y)).length * (expandCount - 1)), 0)), 0);
}

function getEmptyRows(space) {
    return space.map((row, y) => row.every(e => !e.isGalaxy) ? y : null).filter(emptyRow => emptyRow);
}

function getEmptyColumns(space) {
    return space[0].map((_, x) => space.every(s => !s[x].isGalaxy) ? x : null).filter(emptyCol => emptyCol);
}

function parseSpace(spaceArray) {
    return spaceArray.map((row, y) => row.map((position, x) => parsePosition(position, x, y))
                     .filter(x => x));
}

function parsePosition(position, x, y) {
    return position == '#' ? new Position(x, y, true) : new Position(x, y, false);
}