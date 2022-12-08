import { parse } from "path";

export default function run(input) {
    let gamma = '';
    let epsilon = '';

    [...input[0]].forEach((_bit, index) => {
        let ones = 0;
        let zeros = 0;
        input.forEach((line) => {
            line[index] === '1' ? ones++ : zeros++;
        });
        gamma += ones > zeros ? "1" : "0";
        epsilon += ones < zeros ? "1" : "0";
    });

    return {
        part1: parseInt(gamma, 2) * parseInt(epsilon, 2),
        part2: 0
    }
}