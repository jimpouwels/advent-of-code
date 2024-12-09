import { swap } from "../../common/arrays";
import ArrayReader from "../../common/array_reader";

export default function run(input) {
    let originalMemory = input.split('').map(p => parseInt(p)).flatMap((p, i) => i % 2 == 0 ? Array(p).fill(i / 2) : Array(p).fill(-1));
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
        while (element == -1 && (memCopy[i] = memCopy.pop()) == -1);
    });
    return memCopy;
}

function defragmentPart2(memory) {
    let memoryReader = new ArrayReader([...memory]);
    let reverseMemoryReader = new ArrayReader([...memoryReader.array()].reverse());
    while (!reverseMemoryReader.end()) {
        reverseMemoryReader.readUntil(v => v != -1);
        let requiredSpace = reverseMemoryReader.read(reverseMemoryReader.peek());
        let readIndex = memoryReader.length() - reverseMemoryReader.readIndex;
        for (let i = 0; i < readIndex; i++) {
            if (memoryReader.at(i) != -1) continue;

            let writeIndex = i;
            while (memoryReader.at(++i) == -1) { }
            if (i - writeIndex < requiredSpace) continue;
            Array.from({ length: requiredSpace }, () => {
                memoryReader.swap(writeIndex++, readIndex++);
            });
            break;
        };
    };
    return memoryReader.array();
}

function checksum(memory) {
    return memory.reduce((sum, val, i) => sum + (val != -1 ? (i * val) : 0), 0);
}