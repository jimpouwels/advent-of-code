import Digit from "./digit.js";
import Display from "./display.js";

export default function run(lines) {
    const displays = parseDisplays(lines);
    convertToDecimalDigits(displays);

    return {
        part1: displays.reduce((sum, val) => sum + val.output.reduce((sum, val) => sum + ([ 2, 3, 4, 7 ].includes(val.length) ? 1 : 0), 0), 0),
        part2: displays.reduce((sum, digit) => sum + +digit.output.reduce((sum, val) => sum + digit.mapping.find(c => c.matches(val)).decimal, ''), 0),
    }
}

function convertToDecimalDigits(displays) {
    while (displays.find(d => d.mapping.length < 10)) {
        displays.forEach(display => display.input.forEach(input => {
            if (display.mapping.find(c => c.matches(input))) {
                return;
            } else if (input.length === 2) {
                display.mapping.push(new Digit(input, 1));
            } else if (input.length === 4) {
                display.mapping.push(new Digit(input, 4));
            } else if (input.length === 3) {
                display.mapping.push(new Digit(input, 7));
            } else if (input.length === 7) {
                display.mapping.push(new Digit(input, 8));
            } else if (input.length === 5 && display.isContainedBy(7, input)) {
                display.mapping.push(new Digit(input, 3));
            } else if (display.contains(6, input)) {
                display.mapping.push(new Digit(input, 5));
            } else if (input.length === 5 && display.doesNotMatch(5, input)) {
                display.mapping.push(new Digit(input, 2));
            } else if (display.isNotContainedBy(3, input) && display.isContainedBy(7, input)) {
                display.mapping.push(new Digit(input, 0));
            } else if (display.isContainedBy(3, input)) {
                display.mapping.push(new Digit(input, 9));
            } else if (input.length === 6 && display.isNotContainedBy(7, input)) {
                display.mapping.push(new Digit(input, 6));
            }
        }));
    }
}

function parseDisplays(lines) {
    return lines.map(line => {
        const splitted = line.split('|');
        return new Display(splitted[0].trim().split(' '), splitted[1].trim().split(' '));
    });
}
