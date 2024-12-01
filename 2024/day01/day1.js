export default function run(input) {
    let leftList = input.map(l => l.split('   ')[0]).sort();
    let rightList = input.map(l => l.split('   ')[1]).sort();

    return {
        part1: leftList.reduce((sum, left, i) => sum + (Math.abs(left - rightList[i])), 0),
        part2: leftList.reduce((sum, left, i) => sum + (left * rightList.filter(r => r == left).length), 0)
    }
}
