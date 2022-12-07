export default function day6(input, distinctCharCount) {
    let startOfMarker = -1;

    for (let i = 0; i < input.length; i++) {
        let mostRecent = input.slice(i, i + distinctCharCount);
        if ([...new Set(mostRecent)].length == distinctCharCount) {
            startOfMarker = i + distinctCharCount;
            break;
        }
    }

    return {
        part1: startOfMarker,
        part2: null
    };
}