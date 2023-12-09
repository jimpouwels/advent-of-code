export default function run(lines) {
    let histories = parseHistories(lines);

    return {
        part1: histories.map(history => extrapolate([...history])).reduce((sum, val) => sum + val, 0),
        part2: histories.map(history => extrapolate([...history], true)).reduce((sum, val) => sum + val, 0)
    }
}

function extrapolate(history, backwards = false) {
    let differences = history.slice(0, -1).map((h, i) => {
        return history[i + 1] - h;
    });
    let result = backwards ? history.shift(): history.pop();
    if (!differences.every(d => d == 0)) {
        result += extrapolate(differences, backwards) * (backwards ? -1 : 1);
    }
    return result;
}

function parseHistories(lines) {
    return lines.map(l => l.split(' ').map(n => parseInt(n)));
}