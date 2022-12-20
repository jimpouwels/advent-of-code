export default function run(lines, days) {
    const fishCounts = new Array(9).fill(0);
    JSON.parse(`[${lines}]`).forEach(f => fishCounts[f]++);

    for (let i = 0; i < days; i++) {
        const nrOfReproducingFish = fishCounts[0];
        fishCounts.shift();
        fishCounts.push(nrOfReproducingFish);
        fishCounts[6] += nrOfReproducingFish;
    }
    return fishCounts.reduce((sum, val) => sum + val);
}