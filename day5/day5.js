import assert from '../assert.js';
import readLines from '../readlines.js';

const lines = readLines('day5/input.txt');

const stacks = parseStacks(lines);
const moves = parseMoves(lines);

assert('HNSNMTLHQ', rearrangeWithCrane9000(moves, stacks));

function rearrangeWithCrane9000(moves, stacks) {
    for (const move of moves) {
        for (let i = 0; i < move.count; i++) {
            let moveValue = stacks[move.from - 1].shift();
            stacks[move.to - 1].unshift(moveValue);
        }
    }
    return stacks.map(s => s[0].replace('[', '').replace(']', '')).join('');
}

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

function parseMoves(lines) {
    const moves = [];
    for (const line of lines) {
        if (!line.startsWith('move')) {
            continue;
        } else {
            const parts = line.split(' ');
            moves.push({ count: parts[1], from: parts[3], to: parts[5] });
        }
    }
    return moves;
}