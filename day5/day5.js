import assert from '../assert.js';
import readLines from '../readlines.js';

const lines = readLines('day5/input.txt');

const stacks = parseStacks(lines);

console.log(stacks);

function parseStacks(lines) {
    let stacks = []
    for (const line of lines) {
        if (!line.trim().startsWith('[')) {
            break;
        }
        for (let i = 0; i < line.length; i += 4) {
            if (!stacks[i/4]) {
                stacks[i/4] = [];
            }
            let crate = line.slice(i, i + 4).trim();
            if (!crate) {
                continue;
            } else {
                stacks[i/4].push(crate);
            }
        }
    }
    return stacks;
}