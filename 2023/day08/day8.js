
export default function run(lines) {
    let instructions = parseInstructions(lines[0]);
    let nodes = parseNodes(lines.slice(2));

    let stepsUntilEnd = [];
    
    nodes.filter(n => n.isBegin()).forEach(currentNode => {
        let steps = 0;
        let currentInstructions = [...instructions];

        while (!currentNode.isEnd()) {
            steps++;
            currentNode = currentNode.next[currentInstructions[0]];
            currentInstructions.push(currentInstructions.shift());
        }
        stepsUntilEnd.push(steps);
    });

    let result = stepsUntilEnd.pop();
    stepsUntilEnd.forEach(n => {
        result = leastCommonDiviser(n, result);
    });

    return result;
}

function leastCommonDiviser(a, b) {
    return a / greatestCommonDiviser(a, b) * b;
}

function greatestCommonDiviser(a, b) {
    return b == 0 ? a : greatestCommonDiviser(b, a % b)
}    

function parseInstructions(line) {
    return line.split('').map(i => i == 'L' ? 0 : 1);
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
        return this.name.endsWith('A');
    }

    isEnd() {
        return this.name.endsWith('Z');
    }
}