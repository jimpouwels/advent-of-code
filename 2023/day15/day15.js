import Logger from "../../common/logger";

let logger = Logger.getLogger('day15');

export default function run(input) {
    let sequence = input.split(',');
    
    let part1 = sequence.reduce((sum, string) => {
        return sum + hash(string);
    }, 0);

    let boxes = Array(256);
    for (let i = 0; i < boxes.length; i++) {
        boxes[i] = new Box();
    }

    sequence.forEach(step => {
        if (step.includes('=')) {
            let splitted = step.split('=');
            let boxIndex = hash(splitted[0]);
            let box = boxes[boxIndex];
            box.insert(splitted[0], parseInt(splitted[1]));
        } else {
            let label = step.split('-')[0]
            let boxIndex = hash(label);
            let box = boxes[boxIndex];
            box.remove(label);
        }
    });

    let part2 = 0;
    boxes.forEach((box, i) => {
        box.lenses.forEach((lens, j) => {
            part2 += ((i + 1) * (j + 1) * lens.focalLength);
        });
    });
    return {
        part1: part1,
        part2: part2
    }
}

function hash(value) {
    let currentValue = 0;
    value.split('').forEach(char => {
        currentValue += char.charCodeAt(0);
        currentValue *= 17;
        currentValue %= 256;
    });
    return currentValue;
}

class Box {
    lenses = [];

    insert(label, focalLength) {
        let existingLens = this.lenses.filter(l => l.label === label);
        if (existingLens.length == 0) {
            this.lenses.push(new Lens(label, focalLength));
        } else {
            existingLens[0].focalLength = focalLength;
        }
    }

    remove(label) {
        this.lenses = this.lenses.filter(l => l.label !== label);
    }
}

class Lens {
    label;
    focalLength;

    constructor(label, focalLength) {
        this.label = label;
        this.focalLength = focalLength;
    }
}