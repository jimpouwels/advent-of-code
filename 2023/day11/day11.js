import Logger from "../../common/logger";
import Position from "./position";

let logger = Logger.getLogger('2023-day11');

export default function run(lines) {
    let spaceArray = lines.map(l => l.split(''));
    
    let part1 = sumDistancesBetweenGalaxiesP1(spaceArray.map(s => [...s]));
    let part2 = sumDistancesBetweenGalaxiesP2(spaceArray.map(s => [...s]));
    return {
        part1: part1,
        part2: part2
    }
}

function sumDistancesBetweenGalaxiesP1(spaceArray) {
    let expandedSpacePart1 = expand(spaceArray);
    let parsedSpace = parseSpace(expandedSpacePart1);
    let sum = 0;
    let galaxies = parsedSpace.flatMap(x => x.filter(y => y.isGalaxy));
    for (let i = 0; i < galaxies.length - 1; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            sum += ((Math.abs(galaxies[i].x - galaxies[j].x) + (Math.abs(galaxies[i].y - galaxies[j].y))));
        }
    }
    return sum;
}

function sumDistancesBetweenGalaxiesP2(space) {
    let expandXIndices = getEmptyColumns(space);
    let expandYIndices = getEmptyRows(space);
    let parsedSpace = parseSpace(space);
    let galaxies = parsedSpace.flatMap(x => x.filter(y => y.isGalaxy));
    let sum = 0;
    galaxies.forEach((g1, i) => {
        if (i >= galaxies.length - 1) return;
        galaxies.forEach((g2, j) => {
            if (j <= i) return;
            sum += ((Math.abs(g1.x - g2.x) + (Math.abs(g1.y - g2.y))));
            sum += expandXIndices.filter(x => (g1.x < x && g2.x > x) || (g2.x < x && g1.x > x)).length * 999999;
            sum += expandYIndices.filter(y => (g1.y < y && g2.y > y) || (g2.y < y && g1.y > y)).length * 999999;
        });
    });
    return sum;
}

function expand(space) {
    getEmptyRows(space).reverse()
                       .forEach(y => space.splice(y + 1, 0, Array(space[0].length).fill('.')));

    getEmptyColumns(space).reverse()
                          .forEach(x => space.forEach(s => s.splice(x, 0, '.')));
    return space;
}

function getEmptyRows(space) {
    return space.map((row, y) => row.every(e => e == '.') ? y : null).filter(emptyRow => emptyRow);
}

function getEmptyColumns(space) {
    return space[0].map((_, x) => space.every(s => s[x] == '.') ? x : null).filter(emptyCol => emptyCol);
}

function parseSpace(spaceArray) {
    return spaceArray.map((row, y) => row.map((position, x) => parsePosition(position, x, y))
                     .filter(x => x));
}

function parsePosition(position, x, y) {
    return position == '#' ? new Position(x, y, true) : new Position(x, y, false);
}