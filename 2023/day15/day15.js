import Logger from "../../common/logger";

let logger = Logger.getLogger('day15');

export default function run(input) {
    let sequence = input.split(',');
    
    let part1 = sequence.reduce((sum, string) => {
        return sum + hash(string);
    }, 0);

    return {
        part1: part1
    }
}

function hash(value) {
    let currentValue = 0;
    value.split('').forEach(char => {
        currentValue += char.charCodeAt(0);
        currentValue *= 17;
        currentValue %= 256;
    });
    return currentValue;
}