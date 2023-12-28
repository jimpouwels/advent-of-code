import Logger from "../../common/logger";

let logger = Logger.getLogger('2023-day14');

const direction = {
    North: {name: "north", yAdd: -1, xAdd: 0},
    West: {name: "west", yAdd: 0, xAdd: -1},
    South: {name: "south", yAdd: 1, xAdd: 0},
    East: {name: "east", yAdd: 0, xAdd: 1}
};

let instructions = [direction.North, direction.West, direction.South, direction.East];

export default function run(lines, cycles) {
    let platform = lines.map(l => l.split(''));
    
    let timesMill = 0;
    let count = 0;
    while (count < cycles) {
        tilt(platform, instructions[0]);
        tilt(platform, instructions[0]);
        tilt(platform, instructions[0]);
        tilt(platform, instructions[0]);
        if (count % 1000000 == 0) {
            timesMill++;
            logger.log(timesMill);
        }
        count++;
    }
    logger.logGrid(platform, (g) => g);
    return platform.reverse().reduce((sum, row, i) => {
        return sum + row.reduce((sum, item) => {
            return sum + (item === 'O' ? i + 1 : 0);
        }, 0);
    }, 0);
}

function tilt(platform, instruction) {
    for (let y = 0; y < platform.length; y++) {
        for (let x = 0; x < platform[0].length; x++) {
            let targetX = instruction.xAdd > 0 ? platform[0].length - 1 - x : x;
            let targetY = instruction.yAdd > 0 ? platform.length - 1 - y : y;
            if (platform[targetY][targetX] !== 'O') continue;
            let xx = targetX;
            let yy = targetY;
            platform[targetY][targetX] = '.';
            while (true) {
                xx += instruction.xAdd;
                yy += instruction.yAdd;
                if (xx < 0 || yy < 0 || xx == platform[0].length || yy == platform.length || ['O', '#'].includes(platform[yy][xx])) {
                    break;
                }
                targetX = xx;
                targetY = yy;
            }
            platform[targetY][targetX] = 'O';
        }
    }
    instructions.push(instructions.shift());
}