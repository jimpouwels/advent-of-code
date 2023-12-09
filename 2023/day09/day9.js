export default function run(lines) {
    let histories = lines.map(l => l.split(' ').map(n => parseInt(n)));

    return {
        part1: sum(histories.map(history => extrapolate([...history]))),
        part2: sum(histories.map(history => extrapolate([...history], true)))
    }
}

function extrapolate(history, backwards = false) {
    let deltas = history.slice(0, -1).map((h, i) => {
        return history[i + 1] - h;
    });
    let result = backwards ? history.shift(): history.pop();
    if (!deltas.every(d => d == 0)) {
        result += extrapolate(deltas, backwards) * (backwards ? -1 : 1);
    }
    return result;
}

function sum(values) {
    return values.reduce((sum, val) => sum + val, 0)
}