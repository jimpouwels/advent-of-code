export default function run(lines) {
    const monkeys = parseMonkeys(lines);

    for (let i = 0; i < 20; i++) {
        monkeys.forEach(monkey => {
            monkey.items.forEach((item, index) => {
                const left = parseInt(monkey.operation.left.replace('{{old}}', item));
                const right = parseInt(monkey.operation.right.replace('{{old}}', item));
                if (monkey.operation.operator == '+') {
                    monkey.items[index] = left + right;
                } else {
                    monkey.items[index] = left * right;
                }
                monkey.items[index] = Math.floor(monkey.items[index] /= 3);
                if (monkey.items[index] % monkey.testDivision === 0) {
                    monkeys[monkey.throwToMonkeyIfTrue].items.push(monkey.items[index]);
                } else {
                    monkeys[monkey.throwToMonkeyIfFalse].items.push(monkey.items[index]);
                }
                monkey.handleCount++;
            });
            monkey.items = [];
        });
    }

    const bussiestMonkeys = monkeys.sort((a, b) => b.handleCount - a.handleCount)
                       .slice(0, 2)

    return {
        part1: bussiestMonkeys[0].handleCount * bussiestMonkeys[1].handleCount,
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

    handleCount = 0;
}