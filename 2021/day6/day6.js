export default function run(lines, days) {
    const fish = JSON.parse(`[${lines}]`);

    const fishMap = new Array(9).fill(0);
    fish.forEach(f => {
        if (!fishMap[f]) {
            fishMap[f] = 0;
        }
        fishMap[f]++;
    })
    for (let i = 0; i < days; i++) {
        const temp = fishMap[0];
        fishMap[0] = fishMap[1];
        fishMap[1] = fishMap[2];
        fishMap[2] = fishMap[3];
        fishMap[3] = fishMap[4];
        fishMap[4] = fishMap[5];
        fishMap[5] = fishMap[6];
        fishMap[6] = fishMap[7] + temp;
        fishMap[7] = fishMap[8];
        fishMap[8] = temp;
    }

    return fishMap.reduce((sum, val) => sum + val);
}