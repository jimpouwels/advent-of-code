import { swap } from "../../common/arrays";
import ArrayReader from "../../common/array_reader";

export default function run(input) {
    let id = 0;
    let originalMemory = input.split('').map(p => parseInt(p)).flatMap((p, i) => i % 2 == 0 ? Array(p).fill(id++) : Array(p).fill(-1));
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
        if (element != -1) return;
        while (true) {
            let end = memCopy.pop();
            if (end != -1) {
                memCopy[i] = end;
                break;
            }

        }
    });
    return memCopy;
}

function defragmentPart2(memory) {
    let memCopy = [...memory];
    let reverse = new ArrayReader([...memCopy].reverse());
    while (reverse.length() > 0) {
        let requiredSpace = reverse.read(reverse.at(0));

        let readIndex = memCopy.length - reverse.readIndex;
        for (let i = 0; i < readIndex; i++) {
            if (memCopy[i] != -1) continue;

            let writeIndex = i;
            while (memCopy[++i] == -1) { }
            if (i - writeIndex < requiredSpace) continue;
            for (let x = 0; x < requiredSpace; x++) {
                swap(memCopy, writeIndex++, readIndex + x);
            }
            break;
        };
    };
    return memCopy;
}

function checksum(memory) {
    return memory.reduce((sum, val, i) => sum + (val != -1 ? (i * val) : 0), 0);
}