export default function run(input) {
    const crabs = JSON.parse(`[${input}]`);

    crabs.sort((a, b) => a - b);

    const min = crabs[0];
    const max = crabs.slice(-1);

    let part1 = Infinity;
    for (let i = min; i <= max; i++) {
        part1 = Math.min(crabs.reduce((sum, val) => sum + Math.abs(val - i), 0), part1);
    }
    let part2 = Infinity;
    for (let i = min; i <= max; i++) {
        part2 = Math.min(crabs.reduce((sum, val) => sum + new Array(Math.abs(val - i)).fill(0).reduce((sum, _val, index) => sum + (index + 1), 0), 0), part2);
    }
    return {
        part1: part1,
        part2: part2
    }
}
