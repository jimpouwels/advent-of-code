export default function run(lines, days) {
    const fishCounts = new Array(9).fill(0);
    JSON.parse(`[${lines}]`).forEach(f => fishCounts[f]++);

    for (let i = 0; i < days; i++) {
        fishCounts[fishCounts.push(fishCounts.shift()) - 3] += fishCounts[8];
    }
    return fishCounts.reduce((sum, val) => sum + val);
}