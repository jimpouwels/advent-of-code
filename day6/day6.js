export default function day6(input) {
    let startOfMarker = -1;

    for (let i = 0; i < input.length; i++) {
        let mostRecent = input.slice(i, i + 4);
        if ([...new Set(mostRecent)].length == 4) {
            startOfMarker = i + 4;
            break;
        }
    }

    return {
        part1: startOfMarker,
        part2: null
    };
}