export default function run(input) {
    const elves = input.split('\n\n')
                  .map(elf => elf.split('\n')
                  .map(val => parseInt(val))
                  .reduce((sum, val) => sum + val))
                  .sort((a, b) => b - a);

    return {
        part1: elves[0],
        part2: elves.slice(0, 3).reduce((sum, val) => sum + val)
    }
}
