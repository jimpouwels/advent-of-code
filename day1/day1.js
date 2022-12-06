export default function day1(input) {
    const elfs = input.split('\n\n')
                  .map(elf => elf.split('\n').map(val => parseInt(val))
                  .reduce((sum, val) => sum + val))
                  .sort((a, b) => b - a);

    return {
        part1: elfs[0],
        part2: elfs.slice(0, 3).reduce((sum, val) => sum + val)
    }
}
