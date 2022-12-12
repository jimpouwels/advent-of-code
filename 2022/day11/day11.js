import Monkey from "./monkey.js";

export default function run(lines, divideBy3, rounds) {
    const monkeys = parseMonkeys(lines, divideBy3);
    
    for (let i = 0; i < rounds; i++) {
        monkeys.forEach(monkey => monkey.inspectAndThrow());
    }

    return monkeys.sort((a, b) => b.handleCount - a.handleCount)
                  .slice(0, 2)
                  .reduce((sum, val) => sum * val.handleCount, 1);
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
        monkey.throwHandler = (item, targetMonkey) => monkeys[targetMonkey].items.push(item);
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
        const formulaParts = formula.split(' ');
        const left = parseInt(formulaParts[0]);
        const right = parseInt(formulaParts[2]);
        return formulaParts[1] === '+' ? left + right : left * right;
    }
}

function parseTestDivision(line) {
    return parseInt(line.split(' by ')[1]);
}

function parseAction(line) {
    return parseInt(line.split('monkey ')[1]);
}