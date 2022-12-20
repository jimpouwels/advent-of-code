export default function run(lines) {
    const fish = JSON.parse(`[${lines}]`);

    for (let i = 0; i < 80; i++) {
        fish.forEach((f, index, fish) => {
            if (f == 0) {
                fish[index] = 6;
                fish.push(8);
            } else {
                fish[index]--;
            }
        });
    }

    return {
        part1: fish.length,
        part2: 0,
    }
}