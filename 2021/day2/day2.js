export default function run(input) {
    const location = { horizontal: 0, depth: 0 };

    input.map(line => parseMove(line)).forEach(move => performMove(move, location));

    return location.horizontal * location.depth;
}

function performMove(move, location) {
    switch (move.direction) {
        case 'forward':
            location.horizontal += move.distance;
            break;
        case 'up':
            location.depth -= move.distance;
            break;
        case 'down':
            location.depth += move.distance;
    }
}

function parseMove(line) {
    const split = line.split(' ');
    return { direction: split[0], distance: parseInt(split[1]) };
}
