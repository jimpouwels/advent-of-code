let handTypes = [];
const LOSE = 'X';
const DRAW = 'Y';
const WIN = 'Z';

export default function run(input) {
    handTypes = createHandTypes();

    let battlesStrat1 = input.map(line => parseBattleStrategy1(line));
    let battlesStrat2 = input.map(line => parseBattleStrategy2(line));

    return {
        part1: playBattles(battlesStrat1),
        part2: playBattles(battlesStrat2)
    };
}
function playBattles(battles) {
    return battles.map(battle => battle.p2.fight(battle.p1))
                  .reduce((total, score) => total + score);
}

function executeFight(hand1, hand2) {
    let score = 0;
    if (hand1 === hand2) {
        score += 3;
    } else if (hand2 === hand1.beats) {
        score += 6;
    }
    return score + hand1.value;
}

function parseBattleStrategy1(line) {
    const splitted = line.split(' ');
    return { p1: parseHandString(splitted[0]), p2: parseHandString(splitted[1]) };
}

function parseBattleStrategy2(line) {
    const splitted = line.split(' ');
    const p1 = parseHandString(splitted[0]);
    const p1Index = handTypes.indexOf(p1);
    
    let p2Index;
    switch (splitted[1]) {
        case LOSE:
            p2Index = previousIndexOf(p1Index, handTypes.length);
            break;
        case WIN:
            p2Index = nextIndexOf(p1Index, handTypes.length);
            break;
        case DRAW:
            p2Index = p1Index;
            break;
    }
    return { p1: p1, p2: handTypes[p2Index] };
}

function parseHandString(value) {
    return handTypes.find(t => t.hasRepresentation(value));
}

function createHandTypes() {
    const handTypes = [ 
                createHand(1, 'A', 'X'),
                createHand(2, 'B', 'Y'),
                createHand(3, 'C', 'Z') 
    ];

    handTypes.forEach((handType, handTypeIndex) => {
        handType.beats = handTypes[previousIndexOf(handTypeIndex, handTypes.length)];
    });
    return handTypes;
}

function previousIndexOf(current, arrayLength) {
    return current == 0 ? arrayLength - 1 : --current;
}

function nextIndexOf(current, arrayLength) {
    return current == arrayLength - 1 ? 0 : ++current;
}

function createHand(value, ...representations) {
    return {
        value: value,
        representations: representations,
        beats: null,
        fight: function(other) {
            return executeFight(this, other);
        },
        hasRepresentation: function(representation) {
            return representations.includes(representation);
        }
    }
}

