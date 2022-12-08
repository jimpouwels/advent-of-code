export default function run(input) {
    const gamma = getGamma(input);
    const epsilon = inverseOf(gamma);
    const oxygen = getLifeSupportRating(input, false);
    const co2 = getLifeSupportRating(input, true);

    return {
        part1: parseInt(gamma, 2) * parseInt(epsilon, 2),
        part2: parseInt(oxygen, 2) * parseInt(co2, 2)
    }
}

function getGamma(input) {
    return [...input[0]].flatMap((_bit, bitIndex) => 
                            countInColumns(input, bitIndex, "1") > input.length / 2 ? "1" : "0")
                        .join('');
}

function getLifeSupportRating(input, inverse, column = 0) {
    let mostCommon = countInColumns(input, column, "1") >= input.length / 2 ? "1" : "0";
    mostCommon = inverse ? inverseOf(mostCommon) : mostCommon;
    const remainingNumbers = input.filter(number => number[column] === mostCommon);
    return remainingNumbers.length > 1 ? getLifeSupportRating(remainingNumbers, inverse, column + 1) : remainingNumbers.join('');
}

function countInColumns(input, bitIndex, bit) {
    return input.reduce((sum, line) => sum + (line[bitIndex] === bit ? 1 : 0), 0);
}

function inverseOf(value) {
    return [...value].flatMap(bit => bit === "1" ? "0" : "1").join('');
}