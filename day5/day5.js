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
    let crateRows = lines.filter(line => line.trim().startsWith('['))
                          .map(line => parseCrateRow(line));
    return convertToStacks(crateRows);    
}

function parseCrateRow(line) {
    const crateRows = [];
    for (let i = 0; i < line.length; i += 4) {
        const stackIndex = i / 4;
        let crate = readChars(line, i, i + 4).trim();
        if (!crate) {
            continue;
        } else {
            crateRows.push({ crate: crate, stackIndex: stackIndex });
        }
    }
    return crateRows;
}

function parseMoves(lines) {
    const moves = [];
    lines.filter(line => line.startsWith('move')).forEach(line => {
        const parts = line.split(' ');
        moves.push({ count: parts[1], from: parts[3] - 1, to: parts[5] - 1 });
    });
    return moves;
}

function convertToStacks(crateRows) {
    const stacks = [];
    crateRows.forEach(row => row.forEach(crate => {
        if (!stacks[crate.stackIndex]) {
            stacks[crate.stackIndex] = [];
        }
        stacks[crate.stackIndex].push(crate.crate);
    }));
    return stacks;
}

function readChars(value, from, to) {
    return value.slice(from, to);
}