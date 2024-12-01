export default function run(input) {
    let leftList = input.map(l => l.split('   ')[0]).sort();
    let rightList = input.map(l => l.split('   ')[1]).sort();

    return {
        part1: leftList.reduce((sum, l, i) => sum + (Math.abs(l - rightList[i])), 0),
        part2: leftList.reduce((sum, l) => sum + (l * rightList.filter(r => r == l).length), 0)
    }
}
