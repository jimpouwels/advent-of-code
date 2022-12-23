export default function run(input) {
    const crabs = JSON.parse(`[${input}]`);

    let part1 = Infinity;
    for (let i = Math.min(...crabs); i <= Math.max(...crabs); i++) {
        part1 = Math.min(crabs.reduce((sum, val) => sum + Math.abs(val - i), 0), part1);
    }
    let part2 = Infinity;
    for (let i = Math.min(...crabs); i <= Math.max(...crabs); i++) {
        part2 = Math.min(crabs.reduce((sum, val) => sum + new Array(Math.abs(val - i)).fill(0).reduce((sum, val, index) => sum + (index + 1), 0), 0), part2);
    }
    return {
        part1: part1,
        part2: part2
    }
}