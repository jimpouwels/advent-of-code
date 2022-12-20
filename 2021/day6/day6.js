export default function run(lines, days) {
    const fishMap = new Array(9).fill(0);
    JSON.parse(`[${lines}]`).forEach(f => fishMap[f]++);

    for (let i = 0; i < days; i++) {
        const temp = fishMap[0];
        fishMap.forEach((_f, i) => fishMap[i] = i == 8 ? temp: i == 6 ? fishMap[i + 1] + temp : fishMap[i + 1]);
    }
    return fishMap.reduce((sum, val) => sum + val);
}