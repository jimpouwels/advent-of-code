import assert from '../assert.js';
import { readLines } from '../readlines.js';

const lines = readLines('day5/input.txt');
const moves = parseMoves(lines);

assert('HNSNMTLHQ', rearrange(moves, parseStacks(lines), false));
assert('RNLFDJMCT', rearrange(moves, parseStacks(lines), true));

function rearrange(moves, stacks, moveStacks) {
    moves.forEach(move => {
        if (moveStacks) {
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
        let moveValue = stacks[move.from].shift();
        stacks[move.to].unshift(moveValue);
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