import Box from "./box";

export default function run(input) {
    let sequence = input.split(',');
    
    let boxes = Array(256).fill(null);
    boxes.forEach((_, i) => boxes[i] = new Box());

    sequence.forEach(step => {
        if (step.includes('=')) {
            let splitted = step.split('=');
            boxes[hash(splitted[0])].insert(splitted[0], parseInt(splitted[1]));
        } else {
            let label = step.split('-')[0]
            boxes[hash(label)].remove(label);
        }
    });

    return {
        part1: sequence.reduce((sum, string) => sum + hash(string), 0),
        part2: boxes.reduce((sum, box, i) => 
                             sum + box.lenses.reduce((sum, lens, j) => 
                             sum + ((i + 1) * (j + 1) * lens.focalLength), 0), 0)
    }
}

function hash(value) {
    return value.split('').reduce((sum, char) => ((sum + char.charCodeAt(0)) * 17) % 256, 0);
}