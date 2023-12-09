export default function run(lines) {
    let histories = parseHistories(lines);

    return {
        part1: histories.map(history => calculateFuture([...history])).reduce((sum, val) => sum + val, 0),
        part2: histories.map(history => calculatePast(history)).reduce((sum, val) => sum + val, 0)
    }
}

function calculateFuture(history) {
    let differences = [];
    for (let i = 0; i < history.length - 1; i++) {
        differences.push(history[i + 1] - history[i]);
    }
    if (differences.every(d => d == 0)) {
        return history.pop();
    }
    return history[history.length - 1] + calculateFuture(differences);
}

function calculatePast(history) {
    let differences = [];
    for (let i = 0; i < history.length - 1; i++) {
        differences.push(history[i + 1] - history[i]);
    }
    if (differences.every(d => d == 0)) {
        return history[0];
    }
    return history[0] - calculatePast(differences);
}

function parseHistories(lines) {
    return lines.map(l => l.split(' ').map(n => parseInt(n)));
}