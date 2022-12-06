import assert from '../assert.js';
import readLines from '../readlines.js';

const lines = readLines('day1/input.txt');
const caloriesPerElf = [];

lines.map(l => l.trim() != '' ? parseInt(l) : 0)
    .map(calories => {
        if (calories > 0) {
            caloriesPerElf[caloriesPerElf.length -1] += calories;
        } else {
            caloriesPerElf.push(0);
        }
    });

const sortedCaloriesPerElf = caloriesPerElf.sort((a, b) => b - a);

assert(73211, sortedCaloriesPerElf[0]);
assert(213958, sortedCaloriesPerElf[0] + sortedCaloriesPerElf[1] + sortedCaloriesPerElf[2]);