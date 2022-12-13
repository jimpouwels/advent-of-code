export default function run(input) {
    const pairs = parseLines(input);

    console.log(compare(pairs[0]));

    return {
        part1: 0,
        part2: 0
    };
}

function compare(pair) {
    let isCorrect = true;
    for (let i = 0; i < pair.left.length(); i++) {
        if (pair.right.values[i] < pair.left.values[i]) {
            isCorrect = false;
        }
    }
    return isCorrect;
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