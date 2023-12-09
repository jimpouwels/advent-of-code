export default function run(input) {
    
    const writtenNumbers = {"one": "1", "two": "2", "three": "3", "four": "4", "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9" }

    return {
        part1: calibration(input, getFirstNumberIn),
        part2: calibration(input, getFirstWrittenNumber)
    }

    function calibration(lines, calibration) {
        return lines.map(line => line.split(''))
                    .reduce((sum, val) => sum + parseInt(calibration(val) + calibration(val, true)), 0);
    }

    function getFirstNumberIn(arr, reverse = false) {
        arr = reverse ? arr.reverse() : arr;
        return arr.filter(x => !isNaN(x))[0];
    }

    function getFirstWrittenNumber(arr, reverse = false) {
        arr = reverse ? arr.reverse() : arr;
        return arr.map((char1, i) => {
            return arr.map((_, j) => {
                if (!isNaN(char1)) {
                    return char1;
                }
                let number = arr.slice(i, j).join('');
                if (reverse) {
                    number = number.split('').reverse().join('');
                }
                if (writtenNumbers[number]) {
                    return writtenNumbers[number];
                }
            }).filter(t => t)[0];
        }).filter(t => t)[0];
    }

}
