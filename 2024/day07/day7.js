export default function run(input) {
    let total = 0;
    let formulas = input.map(l => {
        let split = l.split(':');
        let result = parseInt(split[0]);
        let numbers = split[1].trim().split(' ').map(v => parseInt(v));
        let operators = operatorList(numbers.length - 1);
        if (operators.reduce((sum, o) => {
            if (numbers.slice(0, -1).reduce((fSum, n, j) => {
                if (o.charAt(j) == "+") {
                    if (fSum == 0) {
                        fSum += (n + numbers[j + 1])
                    } else {
                        fSum += numbers[j + 1];
                    }
                } else {
                    if (fSum == 0) {
                        fSum += (n * numbers[j + 1])
                    } else {
                        fSum *= numbers[j + 1];
                    }
                }
                return fSum;
            }, 0) == result) {
                sum += result;
            }
            return sum;
        }, 0) > 0) {
            total += result;
        }
    });

    return total;
}

function operatorList(depth, current = '') {
    if (current.length === depth) return [current];
    let combinations = [];

    ['+', '*'].forEach(o => {
        operatorList(depth, current + o).forEach(r => {
            combinations.push(r);
        });
    });
    return combinations;
}