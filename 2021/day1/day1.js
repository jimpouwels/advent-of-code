export default function day1(input) {

    return {
        part1: input.filter((x, i) => i < input.length - 1 ? parseInt(x) < input[i + 1] : false).length,
        part2: 0
    }
}
