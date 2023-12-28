import Logger from "../../common/logger";

let logger = Logger.getLogger('2023-day14');

const direction = {
    North: {yAdd: -1, xAdd: 0},
    West: {yAdd: 0, xAdd: -1},
    South: {yAdd: 1, xAdd: 0},
    East: {yAdd: 0, xAdd: 1}
};

let instructions = [direction.North, direction.West, direction.South, direction.East];

let cache = [];

export default function run(lines, cycles) {
    let platform = lines.map(l => l.split(''));
    
    let platformPart1 = platform.map(r => r.map(d => d));
    tilt(platformPart1, direction.North);

    let platformPart2 = platform.map(r => r.map(d => d));
    let count = 0;
    while (count < cycles) {
        tiltRound(platformPart2);
        
        let tiltResult = JSON.stringify(platformPart2);
        let seenIndex = cache.indexOf(tiltResult);
        if (seenIndex >= 0) {
            count = cycles - (cycles - count) % (count - seenIndex);
        } else {
            cache.push(tiltResult);
        }
        count++;
    }

    return {
        part1: sum(platformPart1),
        part2: sum(platformPart2)
    }
}

function tiltRound(platform) {
    tilt(platform, instructions[0]);
    instructions.push(instructions.shift());
    tilt(platform, instructions[0]);
    instructions.push(instructions.shift());
    tilt(platform, instructions[0]);
    instructions.push(instructions.shift());
    tilt(platform, instructions[0]);
    instructions.push(instructions.shift());
}

function sum(platform) {
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
            let nextX = targetX;
            let nextY = targetY;
            platform[targetY][targetX] = '.';
            while (true) {
                nextX += instruction.xAdd;
                nextY += instruction.yAdd;
                if (nextX < 0 || nextY < 0 || nextX == platform[0].length || nextY == platform.length || ['O', '#'].includes(platform[nextY][nextX])) {
                    break;
                }
                targetX = nextX;
                targetY = nextY;
            }
            platform[targetY][targetX] = 'O';
        }
    }
}