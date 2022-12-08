export default function day1(input) {

    return {
        part1: input.filter((x, i) => i < input.length - 1 ? x < input[i + 1] : false ).length,
        part2: 0
    }
}
