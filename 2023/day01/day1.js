export default function run(input) {
    
    const writtenNumbers = {"one": "1", "two": "2", "three": "3", "four": "4", "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9" }

    return {
        part1: calibration(input, getFirstNumberIn),
        part2: calibration(input, getFirstWrittenNumber)
    }

    function calibration(lines, calibrationFunc) {
        return lines
            .map(line => line.split(''))
            .reduce((sum, val) => sum + parseInt(calibrationFunc(val) + 
                                                 calibrationFunc(val, true)), 0);
    }

    function getFirstNumberIn(arr, reverse = false) {
        let values = reverse ? arr.reverse() : arr;
        return values.filter(x => !isNaN(x))[0];
    }

    function getFirstWrittenNumber(arr, reverse = false) {
        let values = reverse ? arr.reverse() : arr;
        let number = "";
        
        for (let i = 0; i < values.length; i++) {
            if (!isNaN(values[i])) {
                return values[i];
            }
            for (let j = i; j < values.length; j++) {
                number += values[j];
                let found = number;
                if (reverse) {
                    found = found.split('').reverse().join('');
                }
                if (writtenNumbers[found]) {
                    return writtenNumbers[found];
                }
            }
            number = "";
        }
    }

}
