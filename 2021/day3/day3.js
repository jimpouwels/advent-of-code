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
        let ones = 0;
        let zeros = 0;
        input.forEach((line) => {
            line[index] === '1' ? ones++ : zeros++;
        });
        return ones > zeros ? "1" : "0";
    }).join('');
}

function inverseOf(value) {
    return [...value].flatMap(bit => bit === "1" ? "0" : "1").join('');
}