export default function run(input) {
    const writtenNumbers = {
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9"
    }

    return {
        part1: calibration1(input),
        part2: calibration2(input)
    }

    function calibration1(lines) {
        return lines
            .map(line => line.split(''))
            .reduce((sum, val) => sum + parseInt(getFirstNumberIn(val) + 
                                                 getFirstNumberIn(val.reverse())), 0);
    }

    function calibration2(lines) {
        return lines
            .map(line => line.split(''))
            .reduce((sum, val) => sum + parseInt(getFirstWrittenNumber(val) + 
                                                 getFirstWrittenNumber(val.reverse(), true)), 0);
    }

    function getFirstNumberIn(arr) {
        return arr.filter(x => !isNaN(x))[0];
    }

    function getFirstWrittenNumber(arr, reverse = false) {
        let number = "";
        for (let i = 0; i < arr.length; i++) {
            if (!isNaN(arr[i])) {
                return arr[i];
            }
            number += arr[i];
            for (let j = i + 1; j < arr.length; j++) {
                number += arr[j];
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
