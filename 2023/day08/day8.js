
export default function run(lines) {
    let instructions = parseInstructions(lines[0]);
    let elements = parseElements(lines.slice(2));

    let current = elements.filter(e => e.name == 'AAA')[0];
    let stepCount = 0;
    let instructionIndex = 0;
    while (current.name != 'ZZZ') {
        let leftOrRight = instructions[instructionIndex++];
        current = elements.filter(e => e. name == current.next[leftOrRight])[0];
        if (instructionIndex == instructions.length) {
            instructionIndex = 0;
        }
        stepCount++;
    }

    return {
        part1: stepCount,
        part2: 0
    }
}

function parseInstructions(line) {
    return line.split('').map(i => i == 'R' ? 1 : 0);
}

function parseElements(lines) {
    return lines.map(line => {
        const { element, left, right } = line.match(/(?<element>.*) = \((?<left>.*), (?<right>.*)\)/).groups
        return new Instruction(element, left, right);
    });
}

class Instruction {
    name;
    next = [];

    constructor(name, left, right) {
        this.name = name;
        this.next.push(left);
        this.next.push(right);
    }
}