export default function run(lines, days) {
    const fishCounts = new Array(9).fill(0);
    JSON.parse(`[${lines}]`).forEach(f => fishCounts[f]++);

    for (let i = 0; i < days; i++) {
        const temp = fishCounts[0];
        fishCounts.forEach((_f, i) => fishCounts[i] = i == 8 ? temp: i == 6 ? fishCounts[i + 1] + temp : fishCounts[i + 1]);
    }
    return fishCounts.reduce((sum, val) => sum + val);
}