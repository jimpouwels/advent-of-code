import * as fs from 'fs';
import * as path from 'path';
import Hand from './hand.js';

const input = fs.readFileSync(path.join(process.cwd(), 'input.txt')).toString();
const lines = input.split('\n');
const handTypes = createHandTypes();

let playerScorePart1 = lines.map(line => parseBattleStrat1(line))
                            .map(battle => battle.p2.fight(battle.p1))
                            .reduce((total, score) => total + score);

console.log(`Part1: My score: ${playerScorePart1}`);

let playerScorePart2 = lines.map(line => parseBattleStrat2(line))
                       .map(battle => battle.p2.fight(battle.p1))
                       .reduce((total, score) => total + score);

console.log(`Part2: My score: ${playerScorePart2}`);

function parseBattleStrat1(line) {
    const splitted = line.split(' ');
    return { p1: parseHandString(splitted[0]), p2: parseHandString(splitted[1]) };
}

function parseBattleStrat2(line) {
    const splitted = line.split(' ');
    const p1 = parseHandString(splitted[0]);

    let p2Index = handTypes.indexOf(p1);
    switch (splitted[1]) {
        case 'X':
            p2Index = handTypes.indexOf(p1) - 1;
            break;
        case 'Z':
            p2Index = handTypes.indexOf(p1) + 1;
            break;
    }
    if (p2Index == handTypes.length) {
        p2Index = 0;
    } else if (p2Index < 0) {
        p2Index = handTypes.length - 1;
    }
    return { p1: p1, p2: handTypes[p2Index] };
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

