import Number from "./number.js";
import Symbol from "./symbol.js";

export default function run(lines) {
    let numbers = parseNumbers(lines);
    let symbols = parseSymbols(lines);

    let part1 = numbers.filter(number => symbols.filter(symbol => number.isAdjacentTo(symbol)).length > 0)
                       .reduce((sum, number) => sum + number.toInt(), 0);

    return {
        part1: part1,
        part2: 0
    }
}

function parseNumbers(lines) {
    let numbers = [];
    let i = 0;
    lines.forEach((line, y) => {
        Array.from(line).forEach((char, x) => {
            if (!isNaN(char)) {
                if (!numbers[i]) {
                    numbers.push(new Number(x, y));
                }
                numbers[i].addDigit(char);
                return;
            } else if (numbers[i]) {
                i++;
            }
        });
    });
    return numbers;
}

function parseSymbols(lines) {
    let symbols = [];
    lines.forEach((line, y) => {
        Array.from(line).forEach((char, x) => {
            if (char !== "." && isNaN(char)) {
                symbols.push(new Symbol(x, y));
            }
        });
    });
    return symbols;
}