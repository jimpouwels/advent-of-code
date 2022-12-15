const distressMarkers = [[[2]], [[6]]];

export default function run(lines) {
    const pairs = lines.split('\n\n').map(pair => pair.split('\n').map(p => JSON.parse(p)));;
    const part1 = pairs.reduce((sum, pair, index) => compare(pair) === 1 ? sum += index + 1 : sum, 0);
    const sorted = [...pairs.flat(), ...distressMarkers].sort((line1, line2) => -compare([line1, line2]));                         

    return {
        part1: part1,
        part2: (sorted.indexOf(distressMarkers[0]) + 1) * (sorted.indexOf(distressMarkers[1]) + 1)
    };
}

function compare([left, right]) {
    const result = left.length < right.length ? 1 : 0;
    for (let i = 0; i < left.length; i++) {
        if (i == right.length) {
            return -1;
        }
        if (isNumber(left[i]) && isNumber(right[i])) {
            const result = left[i] === right[i] ? 0 : left[i] < right[i] ? 1 : -1;
            if (result != 0) {
                return result;
            }
        } else {
            const result = compare([isNumber(left[i]) ? [left[i]] : left[i], 
                                  isNumber(right[i]) ? [right[i]] : right[i]]);
            if (result != 0) {
                return result;
            }
        }
    }
    return result;
}

function isNumber(item) {
    return typeof item === "number";
}