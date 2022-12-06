import * as fs from 'fs';
import * as path from 'path';

const input = fs.readFileSync(path.join(process.cwd(), 'input.txt')).toString();
const rucksacks = input.split('\n');

const lowerCaseAsciiOffset = 96; // maps to ascii '1'
const upperCaseAsciiOffset = 38; // maps to ascii '65'

let duplicateTotal = rucksacks
                        .flatMap(rucksack => {
                            const half = Math.ceil(rucksack.length / 2);    
                            const comp1 = [...new Set(rucksack.slice(0, half))];
                            const comp2 = [...new Set(rucksack.slice(half))];
                            return comp1.filter(itemA => comp2.find(itemB => itemA === itemB));
                        })
                        .reduce((total, i) => total + valueOf(i), 0);

console.log(`Part 1: ${duplicateTotal}`);

let badgesTotal = 0;

for (let i = 0; i < rucksacks.length; i += 3) {
    r1Loop: for (let r1 of rucksacks[i]) {
        for (let r2 of rucksacks[i+1]) {
            if (r1 === r2) {
                for (let r3 of rucksacks[i+2]) {
                    if (r1 === r3) {
                        badgesTotal += valueOf(r1);
                        break r1Loop;
                    }
                }
            }
        }
    }
}

console.log(`Part 2: ${badgesTotal}`);

function valueOf(char) {
    const value = char.charCodeAt(0);
    return value - (value > 96 ? lowerCaseAsciiOffset : upperCaseAsciiOffset);
}
