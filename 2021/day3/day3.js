export default function run(input) {
    const gamma = getGamma(input);
    const epsilon = inverseOf(gamma);
    return {
        part1: parseInt(gamma, 2) * parseInt(epsilon, 2),
        part2: 0
    }
}

function getGamma(input) {
    return [...input[0]].flatMap((_bit, index) => 
                            countInColumns(input, index, "1") > input.length / 2 ? "1" : "0")
                        .join('');
}

function countInColumns(input, index, bit) {
    return input.reduce((sum, line) => sum + (line[index] === bit ? 1 : 0), 0);
}

function inverseOf(value) {
    return [...value].flatMap(bit => bit === "1" ? "0" : "1").join('');
}