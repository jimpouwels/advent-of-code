export default function run(input) {
    const pairs = parseLines(input);

    console.log(pairs);
    return {
        part1: 0,
        part2: 0
    };
}

function parseLines(lines) {
    return lines.split('\n\n').map(pair => { 
        const splittedPair = pair.split('\n');
        const left = parseLine(splittedPair[0]);
        const right = parseLine(splittedPair[1]);
        return { left: left, right: right };
    });
}

function parseLine(line) {
    return line;
}