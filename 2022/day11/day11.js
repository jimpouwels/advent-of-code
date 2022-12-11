export default function run(lines) {
    const monkeys = parseMonkeys(lines);

    return {
        part1: 0,
        part2: 0
    }
}

function parseMonkeys(lines) {
    const monkeys = [];
    for (let i = 0; i < lines.length; i += 7) {
        const monkey = new Monkey();
        monkey.items = parseStartingItems(lines[i + 1]);
        monkey.operation = parseOperation(lines[i + 2]);
        monkey.testDivision = parseTestDivision(lines[i + 3]);
        monkeys.push(monkey);
    }
    return monkeys;
}

function parseStartingItems(line) {
    return line.split(': ')[1].split(', ').map(worryLevel => parseInt(worryLevel));
}

function parseOperation(line) {
    const operationString = line.split(' = ')[1];
}

function parseTestDivision(line) {
    return parseInt(line.split(' by ')[1]);
}

class Monkey {
    items = [];
}