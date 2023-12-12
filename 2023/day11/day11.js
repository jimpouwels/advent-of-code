import Logger from "../../common/logger";
import Position from "./position";
import Galaxy from "./galaxy";

let logger = Logger.getLogger('2023-day11');

export default function run(lines) {
    let spaceArray = lines.map(l => l.split(''));
    
    let part1 = sumDistancesBetweenGalaxiesP1(spaceArray);
    let part2 = sumDistancesBetweenGalaxiesP2(spaceArray);
    return {
        part1: part1,
        part2: part2
    }
}

function sumDistancesBetweenGalaxiesP1(spaceArray) {
    let expandedSpacePart1 = expand(spaceArray);
    let parsedSpace = parseSpace(expandedSpacePart1);
    let sum = 0;
    let galaxies = parsedSpace.flatMap(x => x.filter(y => y instanceof Galaxy));
    for (let i = 0; i < galaxies.length - 1; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            sum += ((Math.abs(galaxies[i].x - galaxies[j].x) + (Math.abs(galaxies[i].y - galaxies[j].y))));
        }
    }
    return sum;
}

function sumDistancesBetweenGalaxiesP2(spaceArray) {

}

function expand(space) {
    let spaceCopy = space.map(s => [...s]);
    getEmptyRows(spaceCopy).reverse()
                           .forEach(y => spaceCopy.splice(y + 1, 0, Array(spaceCopy[0].length).fill('.')));

    getEmptyColumns(spaceCopy).reverse()
                              .forEach(x => spaceCopy.forEach(s => s.splice(x, 0, '.')));
    return spaceCopy;
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
    return position == '#' ? new Galaxy(x, y) : new Position(x, y);
}