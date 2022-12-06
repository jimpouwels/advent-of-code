import * as fs from 'fs';
import * as path from 'path';

const input = fs.readFileSync(path.join(process.cwd(), 'input.txt')).toString();
const rucksacks = input.split('\n');

const lowerCaseAsciiOffset = 96; // maps to ascii '1'
const upperCaseAsciiOffset = 38; // maps to ascii '65'

let total = rucksacks
    .flatMap(rucksack => {
        const half = Math.ceil(rucksack.length / 2);    
        const comp1 = [...new Set(rucksack.slice(0, half))];
        const comp2 = [...new Set(rucksack.slice(half))];
        return comp1.filter(itemA => comp2.find(itemB => itemA === itemB));
    })
    .reduce((total, i) => total + valueOf(i), 0);

console.log(`Part 1: ${total}`);

function valueOf(char) {
    const value = char.charCodeAt(0);
    return value - (value > 96 ? lowerCaseAsciiOffset : upperCaseAsciiOffset);
}
