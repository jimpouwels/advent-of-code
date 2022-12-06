import assert from '../assert.js';
import { readLines } from '../readlines.js';

const lines = readLines('day5/input.txt');
const moves = parseMoves(lines);

assert('HNSNMTLHQ', rearrangeWithCrane9000(moves, parseStacks(lines)));
assert('RNLFDJMCT', rearrangeWithCrane9001(moves, parseStacks(lines)));

function rearrangeWithCrane9000(moves, stacks) {
    moves.forEach(move => {
        for (let i = 0; i < move.count; i++) {
            moveSingle(stacks, move);
        }
    });
    return printTopRow(stacks);
}

function rearrangeWithCrane9001(moves, stacks) {
    moves.forEach(move => {
        moveMultiple(stacks, move);
    });
    return printTopRow(stacks);
}

function moveMultiple(stacks, move) {
    let stackToMove = [];
    for (let i = 0; i < move.count; i++) {
        stackToMove.push(stacks[move.from].shift());
    }
    stackToMove.reverse().forEach(i => {
        stacks[move.to].unshift(i);
    })
}

function moveSingle(stacks, move) {
    let moveValue = stacks[move.from].shift();
    stacks[move.to].unshift(moveValue);
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
    for (const line of lines) {
        if (!line.startsWith('move')) {
            continue;
        } else {
            const parts = line.split(' ');
            moves.push({ count: parts[1], from: parts[3] - 1, to: parts[5] - 1 });
        }
    }
    return moves;
}