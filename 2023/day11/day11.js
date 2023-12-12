import Logger from "../../common/logger";

let logger = Logger.getLogger('2023-day11');

export default function run(lines) {
    let space = lines.map(l => l.split(''));
    expand(space);
    let parsedSpace = space.map((row, y) => row.map((s, x) =>
                                              s == '#' ? new Galaxy(x, y) : new Position(x, y))
                                         .filter(x => x));

    let galaxies = parsedSpace.flatMap(x => x.filter(y => y instanceof Galaxy));

    let sum = 0;
    for (let i = 0; i < galaxies.length - 1; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            sum += ((Math.abs(galaxies[i].x - galaxies[j].x) + (Math.abs(galaxies[i].y - galaxies[j].y))));
        }
    }
    return {
        part1: sum,
        part2: 0
    }
}

function expand(space) {
    let expandY = [];
    for (let y = 0; y < space.length; y++) {
        if (space[y].every(e => e == '.')) {
            expandY.push(y);
        }
    }
    expandY.reverse().forEach(y => space.splice(y + 1, 0, Array(space[0].length).fill('.')));

    let expandX = [];
    for (let x = 0; x < space[0].length; x++) {
        if (space.every(s => s[x] == '.') > 0) {
            expandX.push(x);
        }
    }
    expandX.reverse().forEach(x => space.forEach(s => s.splice(x, 0, '.')));
    
}

class Position {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Galaxy extends Position {
    constructor(x, y) {
        super(x, y);
    }

}