import Hand from './hand.js';

let handTypes = [];
const LOSE = 'X';
const DRAW = 'Y';
const WIN = 'Z';

export default function day2(input) {
    handTypes = createHandTypes();

    let battlesStrat1 = input.map(line => parseBattleStrat1(line));
    let battlesStrat2 = input.map(line => parseBattleStrat2(line));

    return {
        part1: playBattles(battlesStrat1),
        part2: playBattles(battlesStrat2)
    };
}
function playBattles(battles) {
    return battles.map(battle => battle.p2.fight(battle.p1))
                  .reduce((total, score) => total + score);
}

function parseBattleStrat1(line) {
    const splitted = line.split(' ');
    return { p1: parseHandString(splitted[0]), p2: parseHandString(splitted[1]) };
}

function parseBattleStrat2(line) {
    const splitted = line.split(' ');
    const p1 = parseHandString(splitted[0]);
    const p1Index = handTypes.indexOf(p1);
    
    let p2Index = p1Index;
    switch (splitted[1]) {
        case LOSE:
            p2Index = previousIndexOf(p1Index, handTypes.length);
            break;
        case WIN:
            p2Index = nextIndexOf(p1Index, handTypes.length);
            break;
        case DRAW:
            break;
    }
    return { p1: p1, p2: handTypes[p2Index] };
}

function parseHandString(value) {
    return handTypes.find(t => t.hasMatch(value));
}

function createHandTypes() {
    const handTypes = [ 
                new Hand(1, 'A', 'X'),
                new Hand(2, 'B', 'Y'),
                new Hand(3, 'C', 'Z') 
    ];

    handTypes.forEach(handType => {
        const handTypeIndex = handTypes.indexOf(handType);
        handTypes[handTypeIndex].beats = handTypes[previousIndexOf(handTypeIndex, handTypes.length)];
    });
    return handTypes;
}

function previousIndexOf(current, arrayLength) {
    if (current == 0) {
        return arrayLength - 1;
    }
    return --current;
}

function nextIndexOf(current, arrayLength) {
    if (current == arrayLength - 1) {
        return 0;
    }
    return ++current;
}

