export default function day5(input) {
    const moves = parseMoves(input);

    return {
        part1: rearrange(moves, parseStacks(input), false),
        part2: rearrange(moves, parseStacks(input), true)
    };
}

function rearrange(moves, stacks, moveStack) {
    moves.forEach(move => {
        if (moveStack) {
            executeStackMove(stacks, move);
        } else {
            executeSingleMove(stacks, move);
        }
    });
    return printTopRow(stacks);
}

function executeStackMove(stacks, move) {
    let stackToMove = [];
    for (let i = 0; i < move.count; i++) {
        stackToMove.push(stacks[move.from].shift());
    }
    stackToMove.reverse().forEach(i => {
        stacks[move.to].unshift(i);
    })
}

function executeSingleMove(stacks, move) {
    for (let i = 0; i < move.count; i++) {
        stacks[move.to].unshift(stacks[move.from].shift());
    }
}

function printTopRow(stacks) {
    return stacks.map(s => s[0].replace('[', '').replace(']', '')).join('');
}

function parseStacks(lines) {
    let stacks = []
    lines.filter(line => line.trim().startsWith('['))
         .map(line => {
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
        });
    return stacks;
}

function parseMoves(lines) {
    const moves = [];
    lines.filter(line => line.startsWith('move')).forEach(line => {
        const parts = line.split(' ');
        moves.push({ count: parts[1], from: parts[3] - 1, to: parts[5] - 1 });
    });
    return moves;
}