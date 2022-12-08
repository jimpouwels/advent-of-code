export default function run(input) {
    const locationPart1 = { horizontal: 0, depth: 0 };
    input.map(line => parseMove(line)).forEach(move => performMove(move, locationPart1));

    const locationPart2 = { horizontal: 0, depth: 0, aim: 0 };
    input.map(line => parseMove(line)).forEach(move => performMoveWithAim(move, locationPart2));
    return {
        part1: locationPart1.horizontal * locationPart1.depth,
        part2: locationPart2.horizontal * locationPart2.depth
    }
}

function performMove(move, location) {
    switch (move.direction) {
        case 'forward':
            location.horizontal += move.value;
            break;
        case 'up':
            location.depth -= move.value;
            break;
        case 'down':
            location.depth += move.value;
    }
}
function performMoveWithAim(move, location) {
    switch (move.direction) {
        case 'forward':
            location.horizontal += move.value;
            location.depth += (location.aim * move.value);
            break;
        case 'up':
            location.aim -= move.value;
            break;
        case 'down':
            location.aim += move.value;
    }
}

function parseMove(line) {
    const split = line.split(' ');
    return { direction: split[0], value: parseInt(split[1]) };
}
