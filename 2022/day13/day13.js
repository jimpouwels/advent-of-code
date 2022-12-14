import List from './list.js';

const distressMarkers = ['[[2]]', '[[6]]'];

export default function run(input) {
    const pairs = parseLines(input);

    let part1 = 0;
    pairs.forEach((pair, index) => {
        if (compareLists(pair.left, pair.right) == 1) {
            part1 += (index + 1);
        }
    });

    const allLists = pairs.flatMap(pair => [pair.left, pair.right]);
    distressMarkers.forEach(marker => allLists.push(parseLine(marker)));
    allLists.sort((line1, line2) => -compareLists(line1, line2));

    const distress = allLists.map((list) => list.toString())
                             .reduce((sum, val, i) => sum *= distressMarkers.includes(val) ? ++i : 1, 1);

    return {
        part1: part1,
        part2: distress
    };
}

function compareLists(left, right) {
    for (let i = 0; i < left.length(); i++) {
        if (i == right.length()) {
            return -1;
        }
        let leftItem = left.values[i];
        let rightItem = right.values[i];
        if (isTypeMismatch(leftItem, rightItem)) {
            leftItem = convertToListIfRequired(leftItem);
            rightItem = convertToListIfRequired(rightItem);
        }
        let result = isNaN(leftItem) || isNaN(rightItem) ? 
                    compareLists(leftItem, rightItem) : 
                    compareInt(leftItem, rightItem);
        if (result != 0) {
            return result;
        }
    }
    if (left.length() < right.length()) {
        return 1;
    }
    return 0;
}

function isTypeMismatch(leftItem, rightItem) {
    return typeof leftItem != typeof rightItem;
}

function convertToListIfRequired(item) {
    if (typeof item === "number") {
        const newList = new List(null);
        newList.push(item);
        return newList;
    }
    return item;
}

function compareInt(left, right) {
    return left === right ? 0 : left < right ? 1 : -1;
}

function parseLines(lines) {
    return lines.split('\n\n').map(pair => { 
        const splittedPair = pair.split('\n');
        const left = parseLine(splittedPair[0]);
        const right = parseLine(splittedPair[1]);
        return { left: left, right: right };
    });
}

function parseLine(line, isDistress = false) {
    let cursor = 0;
    let root, currentList = null;
    while (cursor < line.length) {
        const token = readToken(line, cursor);
        cursor += token.length;
        switch (token) {
            case '[':
                const subList = new List(currentList, isDistress);
                if (!root) {
                    root = subList;
                    currentList = root;
                } else {
                    currentList.push(subList);
                    currentList = subList;
                }
                break;
            case ']':
                currentList = currentList.parent;
                break;
            case ',':
                break;
            default:
                currentList.push(parseInt(token));
        }
    }
    return root;
}

function readToken(line, cursor) {
    let token = line.charAt(cursor);
    if (isNaN(token)) {
        return token;
    } else {
        if (!isNumber(line, cursor)) {
            return token + readToken(line, cursor + 1);
        } else {
            return token;
        }
    }
}

function isNumber(line, cursor) {
    return isNaN(line.charAt(cursor + 1));
}
