export default function run(lines) {
    let histories = lines.map(l => l.split(' ').map(n => parseInt(n))).map(h => extrapolate(h));
    return {
        part1: histories.reduce((sum, val) => sum + val.pop(), 0),
        part2: histories.reduce((sum, val) => sum + val.shift(), 0)
    }
}

function extrapolate(history) {
    let deltas = history.slice(0, -1).map((h, i) => {
        return history[i + 1] - h;
    });
    if (!deltas.every(d => d == 0)) {
        deltas = extrapolate(deltas);
    }
    history.push(history[history.length - 1] + deltas.pop());
    history.unshift(history[0] - deltas.shift());
    return history;
}