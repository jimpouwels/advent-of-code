import Logger from "../../common/logger";

let logger = Logger.getLogger('day15');

export default function run(input) {
    let sequence = input.split(',');
    
    return sequence.reduce((sum, string) => {
        let currentValue = 0;
        string.split('').forEach(char => {
            currentValue += char.charCodeAt(0);
            currentValue *= 17;
            currentValue %= 256;
        });
        return sum + currentValue;
    }, 0);
}