const direction = {
    North: {moveY: -1, moveX: 0},
    West: {moveY: 0, moveX: -1},
    South: {moveY: 1, moveX: 0},
    East: {moveY: 0, moveX: 1}
};
let instructions = [direction.North, direction.West, direction.South, direction.East];

export default function run(lines) {
    let platform = lines.map(l => l.split(''));
    let platformPart1 = platform.map(r => r.map(i => i));
    let platformPart2 = platform.map(r => r.map(i => i));
    
    // Part 1
    tilt(platformPart1, direction.North);
    
    // Part 2
    let cycles = 1000000000;
    let count = 0;
    let seen = [];
    while (count < cycles) {
        instructions.forEach(_ => {
            tilt(platformPart2, instructions[0]);
            instructions.push(instructions.shift());
        });      
        let tiltResult = JSON.stringify(platformPart2);
        count = skipCyclesIfSeen(seen.indexOf(tiltResult), cycles, count) + 1;
        seen.push(tiltResult);
    }

    return {
        part1: sum(platformPart1),
        part2: sum(platformPart2)
    }
}

function skipCyclesIfSeen(seenIndex, cycles, count) {
    if (seenIndex >= 0) {
        return cycles - (cycles - count) % (count - seenIndex);
    }
    return count;    
}

function sum(platform) {
    return platform.reverse().reduce((sum, row, i) => 
        sum + row.reduce((sum, item) => 
            sum + (item === 'O' ? i + 1 : 0), 0), 0);
}

function tilt(platform, instruction) {
    for (let y = 0; y < platform.length; y++) {
        for (let x = 0; x < platform[0].length; x++) {
            let targetX = instruction.moveX > 0 ? platform[0].length - 1 - x : x;
            let targetY = instruction.moveY > 0 ? platform.length - 1 - y : y;
            if (platform[targetY][targetX] !== 'O') continue;
            platform[targetY][targetX] = '.';
            while (isFree(targetX + instruction.moveX, targetY + instruction.moveY, platform)) {
                targetX += instruction.moveX;
                targetY += instruction.moveY;
            }
            platform[targetY][targetX] = 'O';
        }
    }
}

function isFree(x, y, platform) {
    return !(x < 0 || y < 0 || x == platform[0].length || y == platform.length || ['O', '#'].includes(platform[y][x]));
}