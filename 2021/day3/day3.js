export default function run(numbers) {
    const gamma = getGamma(numbers);
    const epsilon = inverseOf(gamma);
    const oxygen = getLifeSupportRating(numbers, false);
    const co2 = getLifeSupportRating(numbers, true);

    return {
        part1: parseInt(gamma, 2) * parseInt(epsilon, 2),
        part2: parseInt(oxygen, 2) * parseInt(co2, 2)
    }
}

function getGamma(numbers) {
    return [...numbers[0]].flatMap((_bit, column) => 
                            countInColumn(numbers, column, "1") > numbers.length / 2 ? "1" : "0")
                        .join('');
}

function getLifeSupportRating(numbers, inverse, column = 0) {
    let mostCommon = countInColumn(numbers, column, "1") >= numbers.length / 2 ? "1" : "0";
    mostCommon = inverse ? inverseOf(mostCommon) : mostCommon;
    const remainingNumbers = numbers.filter(number => number[column] === mostCommon);
    return remainingNumbers.length > 1 ? getLifeSupportRating(remainingNumbers, inverse, column + 1) : remainingNumbers.join('');
}

function countInColumn(input, column, bit) {
    return input.reduce((sum, line) => sum + (line[column] === bit ? 1 : 0), 0);
}

function inverseOf(value) {
    return [...value].flatMap(bit => bit === "1" ? "0" : "1").join('');
}