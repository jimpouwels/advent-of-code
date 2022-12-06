import * as fs from 'fs';
import * as path from 'path';

const input = fs.readFileSync(path.join(process.cwd(), 'input.txt')).toString();
const lines = input.split('\n');

let total = lines.reduce((total, line) => {
    const ranges = line.split(',');
    const range1 = parseRange(ranges[0]);
    const range2 = parseRange(ranges[1]);

    if ((range1.from >= range2.from && range1.to <= range2.to) ||
        (range2.from >= range1.from && range2.to <= range1.to)) {
        return total + 1;
    }
    return total;
}, 0);

console.log(`Part 1: ${total}`);

function parseRange(stringValue) {
    const parts = stringValue.split('-');
    return { from: parseInt(parts[0]), to: parseInt(parts[1]) };
}