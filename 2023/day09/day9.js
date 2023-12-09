export default function run(lines) {
    let histories = parseHistories(lines);

    return histories.map(history => calculateFuture(history)).reduce((sum, val) => sum + val, 0);
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

function parseHistories(lines) {
    return lines.map(l => l.split(' ').map(n => parseInt(n)));
}