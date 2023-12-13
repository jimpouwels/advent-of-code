import { leastCommonDiviser } from "../../common/math";
import Instruction from "./instruction";

export default function run(lines) {
    let instructions = parseInstructions(lines[0]);
    let nodes = parseNodes(lines.slice(2));

    return {
        part1: calculateStepCount(nodes, instructions, n => n.name == 'AAA'),
        part2: calculateStepCount(nodes, instructions, n => n.name.endsWith('A'))
    }
}

function calculateStepCount(nodes, instructions, beginNodeMatcher) {
    return nodes.filter(beginNodeMatcher).map(currentNode => {
        let steps = 0;
        let currentInstructions = [...instructions];

        while (!currentNode.isEnd()) {
            steps++;
            currentNode = currentNode.next[currentInstructions[0]];
            currentInstructions.push(currentInstructions.shift());
        }
        return steps;
    }).reduce((result, steps) => leastCommonDiviser(steps, result), 1);
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