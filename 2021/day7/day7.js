export default function run(input) {
    const crabs = JSON.parse(`[${input}]`);

    let lowestFuel = Infinity;
    for (let i = Math.min(...crabs); i <= Math.max(...crabs); i++) {
        lowestFuel = Math.min(crabs.reduce((sum, val) => sum + Math.abs(val - i), 0), lowestFuel);
    }
    return {
        part1: lowestFuel
    }
}