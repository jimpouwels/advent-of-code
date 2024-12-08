export default function run(input, possibleOperators) {
    let total = 0;
    input.forEach(l => {
        let split = l.split(':');
        let result = parseInt(split[0]);
        let numbers = split[1].trim().split(' ').map(v => parseInt(v));
        let operators = operatorList(possibleOperators, numbers.length - 1);
        if (operators.reduce((sum, o) => {
            if (numbers.slice(0, -1).reduce((fSum, n, j) => {
                let char = o.charAt(j);
                if (char == "+") {
                    if (fSum == 0) {
                        fSum += (n + numbers[j + 1])
                    } else {
                        fSum += numbers[j + 1];
                    }
                } else if (char == "*") {
                    if (fSum == 0) {
                        fSum += (n * numbers[j + 1])
                    } else {
                        fSum *= numbers[j + 1];
                    }
                } else {
                    if (fSum == 0) {
                        fSum += parseInt(n.toString() + numbers[j + 1].toString());
                    } else {
                        fSum = parseInt(fSum.toString() + numbers[j + 1].toString());
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

function operatorList(possibleOperators, depth, current = '') {
    if (current.length === depth) return [current];
    let combinations = [];

    possibleOperators.forEach(o => {
        operatorList(possibleOperators, depth, current + o).forEach(r => {
            combinations.push(r);
        });
    });
    return combinations;
}