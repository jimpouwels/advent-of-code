export default function run(lines) {
    const digits = lines.map(line => {
        const splitted = line.split('|');
        return new Line(splitted[0].trim().split(' '), splitted[1].trim().split(' '));
    });

    const lengths = [ 2, 3, 4, 7 ];

    while (digits.find(d => d.mapping.length < 10)) {
        digits.forEach(digit => {
            const convertedDigits = digit.mapping;
            digit.input.forEach(input => {
                if (convertedDigits.find(c => c.matches(input))) {
                    return;
                }
                if (input.length === 2) {
                    convertedDigits.push(new Digit(input, 1));
                } else if (input.length === 4) {
                    convertedDigits.push(new Digit(input, 4));
                } else if (input.length === 3) {
                    convertedDigits.push(new Digit(input, 7));
                } else if (input.length === 7) {
                    convertedDigits.push(new Digit(input, 8));
                } else if (input.length === 5 && digit.contains(7, input)) {
                    convertedDigits.push(new Digit(input, 3));
                } else if (input.length === 6 && digit.doesNotContain(3, input) && digit.contains(7, input)) {
                    convertedDigits.push(new Digit(input, 0));
                } else if (input.length === 6 && digit.contains(3, input)) {
                    convertedDigits.push(new Digit(input, 9));
                } else if (input.length === 5 && convertedDigits.find(c => c.decimal === 6 && c.contains(input))) {
                    convertedDigits.push(new Digit(input, 5));
                } else if (input.length === 5 && convertedDigits.find(c => c.decimal === 5 && !c.matches(input))) {
                    convertedDigits.push(new Digit(input, 2));
                } else if (input.length === 6 && digit.doesNotContain(7, input)) {
                    convertedDigits.push(new Digit(input, 6));
                }
            });
            digit.mapping = convertedDigits;
        });
    }

    return {
        part1: digits.reduce((sum, val) => sum + val.output.reduce((sum, val) => sum + (lengths.includes(val.length) ? 1 : 0), 0), 0),
        part2: digits.reduce((sum, digit) => sum + +digit.output.reduce((sum, val) => sum + digit.mapping.find(c => c.matches(val)).decimal, ''), 0),
    }
}

class Line {
    mapping = [];
    input = [];
    output = [];

    constructor(input, output) {
        this.input = input;
        this.output = output;
    }

    contains(decimal, otherInput) {
        return this.mapping.find(c => decimal === c.decimal && c.isContainedBy(otherInput));
    }

    doesNotContain(decimal, otherInput) {
        return this.mapping.find(c => decimal === c.decimal && !c.isContainedBy(otherInput));
    }
}

class Digit {
    requiredChars;
    decimal;

    constructor(requiredChars, decimal) {
        this.requiredChars = requiredChars;
        this.decimal = decimal;
    }

    matches(chars) {
        return this.contains(chars) && chars.length === this.requiredChars.length;
    }

    contains(chars) {
        return [...chars].filter(c => this.requiredChars.includes(c)).length === chars.length;
    }

    isContainedBy(chars) {
        return [...this.requiredChars].filter(c => chars.includes(c)).length === this.requiredChars.length;
    }
}
