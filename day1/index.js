import * as fs from 'fs';
import * as path from 'path';

const inputText = fs.readFileSync(path.join(process.cwd(), 'input.txt')).toString();
const lines = inputText.split('\n');

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

console.log(`Part 1: ${sortedCaloriesPerElf[0]}`);
console.log(`Part 2: ${sortedCaloriesPerElf[0] + sortedCaloriesPerElf[1] + sortedCaloriesPerElf[2]}`);