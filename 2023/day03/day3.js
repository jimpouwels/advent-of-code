import Number from "./number.js";
import Symbol from "./symbol.js";

export default function run(lines) {
    let numbers = parseNumbers(lines);
    let symbols = parseSymbols(lines);
    let gears = symbols.filter(symbol => symbol.getValue() === '*');

    let part1 = numbers.filter(number => symbols.filter(symbol => number.isAdjacentTo(symbol)).length > 0)
                       .reduce((sum, number) => sum + number.toInt(), 0);

    let part2 = gears.filter(gear => numbers.filter(number => number.isAdjacentTo(gear)).length == 2)
                     .map(gear => numbers.filter(number => number.isAdjacentTo(gear))
                                         .reduce((sum, number) => sum * number.toInt(), 1))
                     .reduce((sum, ratio) => sum + ratio, 0);

    return {
        part1: part1,
        part2: part2
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
                symbols.push(new Symbol(x, y, char));
            }
        });
    });
    return symbols;
}