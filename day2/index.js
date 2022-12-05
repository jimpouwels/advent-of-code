import * as fs from 'fs';
import * as path from 'path';
import Hand from './hand.js';

const input = fs.readFileSync(path.join(process.cwd(), 'input.txt')).toString();
const lines = input.split('\n');
const types = createTypes();

let playerScore = lines.map(line => parse(line))
                       .map(hands => hands.p2.battle(hands.p1))
                       .reduce((total, score) => total + score);

console.log(`Part1: My score: ${playerScore}`);

function parse(line) {
    const splitted = line.split(' ');
    return { p1: parseHandString(splitted[0]), p2: parseHandString(splitted[1]) };
}

function parseHandString(value) {
    return types.find(t => t.hasMatch(value));
}

function createTypes() {
    const types = [ new Hand("ROCK", 1, 'A', 'X'),
                new Hand("PAPER", 2, 'B', 'Y'),
                new Hand("SCISSORS", 3, 'C', 'Z') ];

    for (let i = 0; i < types.length; i++) {
        let previous = i - 1;
        if (previous < 0) {
            previous = types.length - 1;
        }
        types[i].beats = types[previous];
    }
    return types;
}

