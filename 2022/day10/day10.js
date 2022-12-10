export default function run(lines) {
    const cycles = parseCycles(lines);

    return 0;
}

function parseCycles(lines) {
    return lines.map(line => {
        const split = line.split(' ');
        if (split[0] === 'noop') {
            return { type: 'noop', cycles: 1, value: 0 };
        } else {
            return { type: 'add', cycles: 2, value: split[1] };
        }
    });
}