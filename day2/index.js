import * as fs from 'fs';
import * as path from 'path';
import Hand from './hand.js';

const input = fs.readFileSync(path.join(process.cwd(), 'input.txt')).toString();
const lines = input.split('\n');
const handTypes = createHandTypes();

let playerScore = lines.map(line => parse(line))
                       .map(hands => hands.p2.battle(hands.p1))
                       .reduce((total, score) => total + score);

console.log(`Part1: My score: ${playerScore}`);

function parse(line) {
    const splitted = line.split(' ');
    return { p1: parseHandString(splitted[0]), p2: parseHandString(splitted[1]) };
}

function parseHandString(value) {
    return handTypes.find(t => t.hasMatch(value));
}

function createHandTypes() {
    const handTypes = [ 
                new Hand("ROCK", 1, 'A', 'X'),
                new Hand("PAPER", 2, 'B', 'Y'),
                new Hand("SCISSORS", 3, 'C', 'Z') 
    ];

    for (let i = 0; i < handTypes.length; i++) {
        let previous = i - 1;
        if (previous < 0) {
            previous = handTypes.length - 1;
        }
        handTypes[i].beats = handTypes[previous];
    }
    return handTypes;
}

