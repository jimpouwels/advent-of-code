export default function run(lines, divideBy3, rounds) {
    const monkeys = parseMonkeys(lines);
    monkeys.forEach(monkey => monkey.onThrow = (item, targetMonkey) => {
        monkeys[targetMonkey].items.push(item);
    });
    const overflow = monkeys.reduce((mod, monkey) => mod * monkey.testDivision, 1);
    console.log(`over: ${overflow}`);
    for (let i = 0; i < rounds; i++) {
        monkeys.forEach(monkey => {
            monkey.items.forEach((item) => {
                item %= overflow;
                let next = 0;
                const left = parseInt(monkey.operation.left.replace('{{old}}', item));
                const right = parseInt(monkey.operation.right.replace('{{old}}', item));
                if (monkey.operation.operator == '+') {
                    next = left + right;
                } else {
                    next = left * right;
                }
                if (divideBy3) {
                    next = Math.floor(next /= 3);
                } else {
                    next = Math.floor(next);
                }
                if (next % monkey.testDivision === 0) {
                    monkey.throw(next, monkey.throwToMonkeyIfTrue);
                } else {
                    monkey.throw(next, monkey.throwToMonkeyIfFalse);
                }
                monkey.handleCount++;
            });
            monkey.items = [];
        });
    }
    const bussiestMonkeys = monkeys.sort((a, b) => b.handleCount - a.handleCount)
                       .slice(0, 2)

    return bussiestMonkeys[0].handleCount * bussiestMonkeys[1].handleCount;
}

function parseMonkeys(lines) {
    const monkeys = [];
    for (let i = 0; i < lines.length; i += 7) {
        const monkey = new Monkey();
        monkey.items = parseStartingItems(lines[i + 1]);
        monkey.operation = parseOperation(lines[i + 2]);
        monkey.testDivision = parseTestDivision(lines[i + 3]);
        monkey.throwToMonkeyIfTrue = parseAction(lines[i + 4]);
        monkey.throwToMonkeyIfFalse = parseAction(lines[i + 5]);
        monkeys.push(monkey);
    }
    return monkeys;
}

function parseStartingItems(line) {
    return line.split(': ')[1].split(', ').map(worryLevel => parseInt(worryLevel));
}

function parseOperation(line) {
    const split = line.replaceAll('old', "{{old}}").split(' = ')[1].split(' ');
    return { left: split[0], operator: split[1], right: split[2] };
}

function parseTestDivision(line) {
    return parseInt(line.split(' by ')[1]);
}

function parseAction(line) {
    return parseInt(line.split('monkey ')[1]);
}

class Monkey {
    items = [];
    operation;
    testDivision;
    throwToMonkeyIfTrue;
    throwToMonkeyIfFalse;
    onThrow;
    handleCount = 0;

    throw(item, targetMonkey) {
        this.onThrow(item, targetMonkey);
    }
}