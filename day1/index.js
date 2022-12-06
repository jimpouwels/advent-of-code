import * as fs from 'fs';
import * as path from 'path';

const inputText = fs.readFileSync(path.join(process.cwd(), 'input.txt')).toString();
const lines = inputText.split('\n');

const elfs = [];

lines.map(l => toInt(l))
    .map(calories => {
        if (calories >= 0) {
            elfs[elfs.length -1] += calories;
        } else {
            elfs.push(0);
        }
    });

const sortedElfs = elfs.sort((a, b) => b - a);

console.log(`Part 1: ${sortedElfs[0]}`);
console.log(`Part 2: ${sortedElfs[0] + sortedElfs[1] + sortedElfs[2]}`);

function toInt(value) {
    return value.trim() === '' ? -1 : parseInt(value);
}