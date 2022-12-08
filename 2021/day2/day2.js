export default function run(input) {
    const location = { horizontal: 0, depth: 0 };

    input.map(line => {
        const split = line.split(' ');
        return { direction: split[0], distance: parseInt(split[1]) };
    }).forEach(move => {
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
    });

    return location.horizontal * location.depth;
}