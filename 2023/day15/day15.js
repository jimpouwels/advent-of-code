import { upsert } from "../../common/arrays";

export default function run(input) {
    let sequence = input.split(',').map(step => parseStep(step));
    
    let boxes = Array(256).fill(null);
    boxes.forEach((_, i) => boxes[i] = {lenses: []});

    sequence.forEach(step => {
        let box = boxes[hash(step.label)];
        if (step.operation === '=') {
            upsert(box.lenses, {label: step.label, focal: step.value}, (l) => l.label === step.label);
        } else {
            box.lenses = box.lenses.filter((l) => l.label !== step.label);
        }
    });
    return {
        part1: sequence.reduce((sum, step) => sum + hash(step.full), 0),
        part2: boxes.reduce((sum, box, i) => 
                             sum + box.lenses.reduce((sum, lens, j) => 
                             sum + ((i + 1) * (j + 1) * lens.focal), 0), 0)
    }
}

function hash(value) {
    return value.split('').reduce((sum, char) => ((sum + char.charCodeAt(0)) * 17) % 256, 0);
}

function parseStep(step) {
    const { label, operation, value } = step.match(/(?<label>.*)(?<operation>[=-])(?<value>.*)/).groups;
    return {label: label, operation: operation, value: parseInt(value), full: step};
}