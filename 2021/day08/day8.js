export default function run(lines) {
    const outputDigits = lines.map(line => {
        const splitted = line.split('|');
        return { input: splitted[0].split(' '), output: splitted[1].split(' ') };
    });

    const lengths = [ 2, 3, 4, 7 ];

   

    return {
        part1: outputDigits.reduce((sum, val) => sum + val.output.reduce((sum, val) => sum + (lengths.includes(val.length) ? 1 : 0), 0), 0),
        part2: 0
    }
}

class Digit {
    requiredChars;
    decimal;

    constructor(requiredChars, decimal) {
        this.requiredChars = requiredChars;
        this.decimal = decimal;
    }

    contains(chars) {
        return [...chars].filter(c => this.requiredChars.includes(c)).length === chars.length;
    }
}
