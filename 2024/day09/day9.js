import { swap } from "../../common/arrays";

export default function run(input) {
    let id = 0;
    let originalMemory = input.split('').flatMap((p, i) => {
        p = parseInt(p);
        if (i % 2 == 0) {
            return Array(p).fill(id++);
        } else {
            return Array(p).fill('.');
        }
    });
    let part1Memory = defragmentPart1(originalMemory);
    let part2Memory = defragmentPart2(originalMemory);

    return {
        part1: checksum(part1Memory),
        part2: checksum(part2Memory)
    }
}

function defragmentPart1(memory) {
    let memCopy = [...memory];
    memCopy.forEach((element, i) => {
        if (element == '.')
            while (true) {
                let end = memCopy.pop();
                if (end != '.') {
                    memCopy[i] = end;
                    break;
                }
            }
    });
    return memCopy;
}

function defragmentPart2(memory) {
    let memCopy = [...memory];
    let indexOfMovableBlock = memCopy.length;
    let reverse = [...memCopy].reverse();
    while (reverse.length > 0) {
        let value = reverse[0];
        if (value == '.') {
            reverse.shift();
            indexOfMovableBlock--;
            continue;
        }
        let requiredSpace = 0;
        while (reverse[0] == value) {
            requiredSpace++;
            reverse.shift();
            indexOfMovableBlock--;
        }

        for (let i = 0; i < indexOfMovableBlock; i++) {
            if (memCopy[i] != '.') continue;

            let freeSpaceStartIndex = i;
            while (memCopy[++i] == '.') { }
            if ((i - freeSpaceStartIndex) < requiredSpace) {
                continue;
            }
            for (let x = 0; x < requiredSpace; x++) {
                swap(memCopy, freeSpaceStartIndex++, indexOfMovableBlock + x);
            }
            break;
        };
    };
    return memCopy;
}

function checksum(memory) {
    return memory.reduce((sum, val, i) => sum + (val != '.' ? (i * val) : 0), 0);
}