export default function run(input) {
    const pairs = parseLines(input);

    let part1 = 0;
    pairs.forEach((pair, index) => {
        if (comparePair(pair)) {
            part1 += (index + 1);
        }
    });

    return {
        part1: part1,
        part2: 0
    };
}

function comparePair(pair) {
    return compareList(pair.left, pair.right);
}

function compareList(left, right) {
    if (left.length() > right.length()) {
        return false;
    }
    for (let i = 0; i < left.length(); i++) {
        if (i >= right.length()) {
            return true;
        }
        let leftItem = left.values[i];
        let rightItem = right.values[i];
        if (Array.isArray(leftItem.values) && !Array.isArray(rightItem.values)) {
            if (!compareInt(leftItem.values[0], rightItem)) {
                return false;
            }
            break;
        } else if (!Array.isArray(leftItem.values) && Array.isArray(rightItem.values)) {
            if (!compareInt(leftItem, rightItem.values[0])) {
                return false;
            }
            break;
        }
        if (Array.isArray(leftItem.values) && Array.isArray(rightItem.values)) {
            if (!compareList(leftItem, rightItem)) {
                return false;
            }
        } else {
            if (!compareInt(leftItem, rightItem)) {
                return false;
            }
        }
    }
    return true;
}

function compareInt(left, right) {
    return left <= right;
}

function parseLines(lines) {
    return lines.split('\n\n').map(pair => { 
        const splittedPair = pair.split('\n');
        const left = parseLine(splittedPair[0]);
        const right = parseLine(splittedPair[1]);
        return { left: left, right: right };
    });
}

function parseLine(line) {
    let cursor = 0;
    let root, currentList = null;
    while (cursor < line.length) {
        const char = readChar(line, cursor++);
        switch (char) {
            case '[':
                const subList = new List(currentList);
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
                currentList.push(parseInt(char));
        }
    }
    return root;
}

function readChar(line, cursor) {
    return line.charAt(cursor);
}

class List {
    values = [];
    parent;

    constructor(parent) {
        this.parent = parent;
    }
    
    push(value) {
        this.values.push(value);
    }

    length() {
        return this.values.length;
    }
}