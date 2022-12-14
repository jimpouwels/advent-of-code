const distressMarkers = [[[2]], [[6]]];

export default function run(input) {
    const pairs = parseLines(input);

    const part1 = pairs.reduce((sum, pair, index) => {
        if (compareLists(pair) === 1) {
            return sum += index + 1;
        }
        return sum;
    }, 0);

    const sorted = [...pairs.flat(), ...distressMarkers]
                           .sort((line1, line2) => -compareLists([line1, line2]));                         

    return {
        part1: part1,
        part2: (sorted.indexOf(distressMarkers[0]) + 1) * (sorted.indexOf(distressMarkers[1]) + 1)
    };
}

function compareLists([left, right]) {
    const result = left.length < right.length ? 1 : 0;
    for (let i = 0; i < left.length; i++) {
        if (i == right.length) {
            return -1;
        }
        let leftItem = left[i];
        let rightItem = right[i];
        if (typeof leftItem === "number" && typeof rightItem === "number") {
            const result = leftItem === rightItem ? 0 : leftItem < rightItem ? 1 : -1;
            if (result != 0) {
                return result;
            }
        } else {
            let result = compareLists([typeof leftItem === "number" ? [leftItem] : leftItem, 
                                    typeof rightItem === "number" ? [rightItem] : rightItem]);
            if (result != 0) {
                return result;
            }
        }
    }
    return result;
}

function parseLines(lines) {
    return lines.split('\n\n').map(pair => { 
        const splittedPair = pair.split('\n');
        const left = JSON.parse(splittedPair[0]);
        const right = JSON.parse(splittedPair[1]);
        return [left, right];
    });
}