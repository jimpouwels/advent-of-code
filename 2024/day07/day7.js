export default function run(input, possibleOperators) {
    return input.reduce((sum, l) => {
        let split = l.split(':');
        let result = parseInt(split[0]);
        let numbers = split[1].trim().split(' ').map(v => parseInt(v));
        let combinations = operatorCombinations(possibleOperators, numbers.length - 1);
        if (combinations.reduce((sum, o) => sum + (numbers.slice(1)
            .reduce((fSum, n, j) => calculate(fSum, n, o.charAt(j)), numbers[0]) == result) ? result : 0, 0) > 0) {
            return sum + result;
        }
        return sum;
    }, 0);
}

function calculate(val1, val2, operator) {
    if (operator == "+") {
        val1 += val2;
    } else if (operator == "*") {
        val1 *= val2;
    } else {
        val1 = parseInt(val1.toString() + val2.toString());
    }
    return val1;
}

function operatorCombinations(possibleOperators, depth, current = '') {
    if (current.length === depth) return [current];
    let combinations = [];

    possibleOperators.forEach(o => {
        operatorCombinations(possibleOperators, depth, current + o).forEach(r => {
            combinations.push(r);
        });
    });
    return combinations;
}