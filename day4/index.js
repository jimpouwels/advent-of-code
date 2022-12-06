import * as fs from 'fs';
import * as path from 'path';

const input = fs.readFileSync(path.join(process.cwd(), 'input.txt')).toString();
const lines = input.split('\n');

let numberCompletelyInclude = 0;
let numberPartiallyInclude = 0;

lines.forEach(line => {
    const ranges = parseRanges(line);
    if (ranges.range1.filter(r1 => ranges.range2.includes(r1)).length === ranges.range1.length ||
        ranges.range2.filter(r2 => ranges.range1.includes(r2)).length === ranges.range2.length) {
        numberCompletelyInclude++;
        numberPartiallyInclude++;
    } else if (ranges.range1.find(r1 => ranges.range2.includes(r1)) ||
        ranges.range2.find(r2 => ranges.range1.includes(r2))) {
        numberPartiallyInclude++;
    }
});

console.log(`Part 1: ${numberCompletelyInclude}`);
console.log(`Part 2: ${numberPartiallyInclude}`);

function parseRanges(line) {
    const ranges = line.split(',');
    const range1 = parseRange(ranges[0]);
    const range2 = parseRange(ranges[1]);
    return { range1: range1, range2: range2 };
}

function parseRange(stringValue) {
    const parts = stringValue.split('-');
    let range = [];
    for (let i = parseInt(parts[0]); i < parseInt(parts[1]) + 1; i++) {
        range.push(i);
    }
    return range;
}