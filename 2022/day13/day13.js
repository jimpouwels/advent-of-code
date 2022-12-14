const distressMarkers = [[[2]], [[6]]];

export default function run(input) {
    const pairs = parseLines(input);

    let part1 = 0;
    pairs.forEach((pair, index) => {
        if (compareLists(pair.left, pair.right) == 1) {
            part1 += (index + 1);
        }
    });

    const allLists = pairs.flatMap(pair => [pair.left, pair.right]);
    distressMarkers.forEach(marker => allLists.push(marker));
    allLists.sort((line1, line2) => -compareLists(line1, line2));
    const part2 = allLists.reduce((sum, val, i) => sum *= distressMarkers.includes(val) ? ++i : 1, 1);

    return {
        part1: part1,
        part2: part2
    };
}

function compareLists(left, right) {
    for (let i = 0; i < left.length; i++) {
        if (i == right.length) {
            return -1;
        }
        let leftItem = left[i];
        let rightItem = right[i];
        if (isTypeMismatch(leftItem, rightItem)) {
            leftItem = convertToListIfRequired(leftItem);
            rightItem = convertToListIfRequired(rightItem);
        }
        let result = Array.isArray(leftItem) && Array.isArray(rightItem) ? 
                    compareLists(leftItem, rightItem) : 
                    compareInt(leftItem, rightItem);
        if (result != 0) {
            return result;
        }
    }
    if (left.length < right.length) {
        return 1;
    }
    return 0;
}

function isTypeMismatch(leftItem, rightItem) {
    return typeof leftItem != typeof rightItem;
}

function convertToListIfRequired(item) {
    if (typeof item === "number") {
        return [item];
    }
    return item;
}

function compareInt(left, right) {
    const leftNumber = parseInt(left);
    const rightNumber = parseInt(right);
    return leftNumber === rightNumber ? 0 : leftNumber < rightNumber ? 1 : -1;
}

function parseLines(lines) {
    return lines.split('\n\n').map(pair => { 
        const splittedPair = pair.split('\n');
        const left = JSON.parse(splittedPair[0]);
        const right = JSON.parse(splittedPair[1]);
        return { left: left, right: right };
    });
}