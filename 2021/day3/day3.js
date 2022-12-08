export default function run(input) {
    const gamma = getGamma(input);
    const epsilon = inverseOf(gamma);
    return {
        part1: parseInt(gamma, 2) * parseInt(epsilon, 2),
        part2: 0
    }
}

function getGamma(input) {
    return [...input[0]].flatMap((_bit, index) => {
        const ones = input.reduce((sum, line) => sum + (line[index] === '1' ? 1 : 0), 0);
        return ones > input.length / 2 ? "1" : "0";
    }).join('');
}

function inverseOf(value) {
    return [...value].flatMap(bit => bit === "1" ? "0" : "1").join('');
}