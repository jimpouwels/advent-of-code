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
    let backPos = memCopy.length;
    let reverse = [...memCopy].reverse();
    while (reverse.length > 0) {
        let value = reverse[0];
        if (value == '.') {
            reverse.shift();
            backPos--;
            continue;
        }
        let requiredSpace = 0;
        while (reverse[0] == value) {
            requiredSpace++;
            reverse.shift();
            backPos--;
        }

        for (let i = 0; i < backPos; i++) {
            if (memCopy[i] != '.') continue;
            let availableSpace = 0;

            let writeIndex = i;
            while (memCopy[writeIndex++] == '.') {
                availableSpace++;
            }
            if (availableSpace < requiredSpace) {
                i += availableSpace; // skip this free space block
                continue;
            }
            let j = i;
            for (let x = 0; x < requiredSpace; x++) {
                swap(memCopy, j++, backPos + x);
                i++;
            }
            break;
        };
    };
    return memCopy;
}

function checksum(memory) {
    return memory.reduce((sum, val, i) => sum + (val != '.' ? (i * val) : 0), 0);
}