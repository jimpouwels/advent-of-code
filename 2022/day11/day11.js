export default function run(lines, divideBy3, rounds) {
    const monkeys = parseMonkeys(lines, divideBy3);
    
    for (let i = 0; i < rounds; i++) {
        monkeys.forEach(monkey => monkey.inspectAndThrow());
    }

    const bussiestMonkeys = monkeys.sort((a, b) => b.handleCount - a.handleCount)
                                   .slice(0, 2);

    return bussiestMonkeys[0].handleCount * bussiestMonkeys[1].handleCount;
}

function parseMonkeys(lines, divideBy3) {
    const monkeys = [];
    for (let i = 0; i < lines.length; i += 7) {
        const monkey = new Monkey(divideBy3);
        monkey.items = parseStartingItems(lines[i + 1]);
        monkey.operation = parseOperation(lines[i + 2]);
        monkey.testDivision = parseTestDivision(lines[i + 3]);
        monkey.throwToMonkeyIfTrue = parseAction(lines[i + 4]);
        monkey.throwToMonkeyIfFalse = parseAction(lines[i + 5]);
        monkeys.push(monkey);
    }
    const limit = monkeys.reduce((total, monkey) => total * monkey.testDivision, 1);
    monkeys.forEach(monkey => { 
        monkey.onThrow = (item, targetMonkey) => monkeys[targetMonkey].items.push(item);
        monkey.limit = limit;
    });
    return monkeys;
}

function parseStartingItems(line) {
    return line.split(': ')[1].split(', ').map(worryLevel => parseInt(worryLevel));
}

function parseOperation(line) {
    const formulaAsString = line.split(' = ')[1];
    return (old) => {
        const formula = formulaAsString.replaceAll('old', old);
        const split = formula.split(' ');
        const left = parseInt(split[0]);
        const right = parseInt(split[2]);
        return split[1] === '+' ? left + right : left * right;
    }
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
    limit = 0;
    handleCount = 0;
    divideBy3;

    constructor(divideBy3) {
        this.divideBy3 = divideBy3;
    }

    throw(item, targetMonkey) {
        this.onThrow(item, targetMonkey);
    }

    inspectAndThrow() {
        this.items.forEach(item => {
            item %= this.limit;

            let valueToThrow = 0;
            valueToThrow = this.operation(item);
            if (this.divideBy3) {
                valueToThrow = Math.floor(valueToThrow /= 3);
            }
            this.throw(valueToThrow, this.isDivisable(valueToThrow) ? 
                                        this.throwToMonkeyIfTrue : 
                                        this.throwToMonkeyIfFalse);
            this.handleCount++;
        });
        this.items = [];
    }

    isDivisable(value) {
        return value % this.testDivision === 0;
    }
}