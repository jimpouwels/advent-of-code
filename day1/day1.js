import assert from '../assert.js';
import { readFile } from '../readlines.js';

const lines = readFile('day1/input.txt');

const elfs = lines.split('\n\n')
                  .map(elf => elf.split('\n').map(val => parseInt(val))
                  .reduce((sum, val) => sum + val))
                  .sort((a, b) => b - a);

assert(73211, elfs[0]);
assert(213958, elfs.slice(0, 3).reduce((sum, val) => sum + val));