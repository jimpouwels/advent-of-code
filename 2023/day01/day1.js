export default function run(input) {
    return {
        part1: part1(input)
    }

    function part1(lines) {
        return lines
            .map(line => line.split(''))
            .reduce((sum, val) => sum + parseInt(firstNumberIn(val) + firstNumberIn(val.reverse())), 0);
    }

    function firstNumberIn(arr) {
        return arr.filter(n => !isNaN(n))[0];
    }
}
