export default function run(input) {
    let leftList = [];
    let rightList = [];
    input.forEach(l => {
        let split = l.split('   ');
        leftList.push(parseInt(split[0]));
        rightList.push(parseInt(split[1]));
    });
    leftList.sort();
    rightList.sort();

    return {
        part1: leftList.reduce((sum, left, i) => sum + (Math.abs(left - rightList[i])), 0),
        part2: leftList.reduce((sum, left, i) => sum + (left * rightList.filter(r => r == left).length), 0)
    }
}
