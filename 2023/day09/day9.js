export default function run(lines) {
    let sequence = lines.map(l => l.split(' ').map(n => parseInt(n))).map(h => extrapolate(h));
    return {
        part1: sequence.reduce((sum, val) => sum + val.pop(), 0),
        part2: sequence.reduce((sum, val) => sum + val.shift(), 0)
    }
}

function extrapolate(sequence) {
    let deltas = sequence.slice(0, -1).map((h, i) => sequence[i + 1] - h);
    if (!deltas.every(d => d == 0)) {
        deltas = extrapolate(deltas);
    }
    sequence.push(sequence[sequence.length - 1] + deltas.pop());
    sequence.unshift(sequence[0] - deltas.shift());
    return sequence;
}