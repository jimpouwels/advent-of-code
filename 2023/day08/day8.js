
export default function run(lines) {
    let instructions = parseInstructions(lines[0]);
    let nodes = parseNodes(lines.slice(2));

    let current = nodes.filter(e => e.isBegin())[0];
    let stepCount = 0;
    let instructionIndex = 0;
    while (!current.isEnd()) {
        let leftOrRight = instructions[instructionIndex++];
        current = current.next[leftOrRight];
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

function parseNodes(lines) {
    let nodes = lines.map(line => {
        const { element } = line.match(/(?<element>.*) =/).groups
        return new Instruction(element);
    });
    lines.forEach((line, i) => {
        const { left, right } = line.match(/= \((?<left>.*), (?<right>.*)\)/).groups;
        nodes[i].setNext(nodes.filter(e => e.name == left)[0], nodes.filter(e => e.name == right)[0]);
    });
    return nodes;
}

class Instruction {
    name;
    next = [];

    constructor(name) {
        this.name = name;
    }
    
    setNext(left, right) {
        this.next.push(left);
        this.next.push(right);
    }

    isBegin() {
        return this.name == 'AAA';
    }

    isEnd() {
        return this.name == 'ZZZ';
    }
}