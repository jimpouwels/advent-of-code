import Logger from "../../common/logger";

let logger = Logger.getLogger('2023-day12');

export default function run(lines) {
    let total = 0;
    lines.forEach(line => {
        const { arrangementString, groupsString } = line.match(/(?<arrangementString>.*) (?<groupsString>.*)/).groups;
        let groups = groupsString.split(',').map(g => parseInt(g));
        let arrangement = arrangementString.split('');
        
    
        let combos = getCombinations(arrangement, groups, 1);
    
        let count = 0;
        combos.forEach(c => {
            if (c.filter((item, i) =>{
                return (arrangement[i] == '?' && item == '.') ||
                       (arrangement[i] == '?' && item == '#') ||
                       (arrangement[i] == '.' && item == '.') ||
                       (arrangement[i] == '#' && item == '#');
            }).length == c.length) {
                count++;
            }
        });
        total += count;
    });
    
    return total;
}

function getCombinations(remainingArrangement, remainingGroups) {
    let combos = [];
    if (remainingGroups.length > 0) {
        for (let gapCount = 0; gapCount < remainingArrangement.length; gapCount++) {
            let req = gapCount + (remainingGroups.length - 1) + remainingGroups.reduce((sum, val) => sum + val, 0);
            if (req > remainingArrangement.length) {
                continue;
            }
            let writeIndex = 0;
            let combo1 = [];
            for (let j = 0; j < gapCount; j++) {
                combo1.push('.');
                writeIndex++
            }
            for (let j = 0; j < remainingGroups[0]; j++) {
                combo1.push('#');
                writeIndex++
            }
            if (remainingGroups.length > 1) {
                writeIndex++;
                combo1.push('.');
            }

            // add tail
            if (remainingGroups.length == 1) {
                for (let j = 0; j < remainingArrangement.length - writeIndex; j++) {
                    combo1.push('.');
                }
                combos.push(combo1);
                continue;
            }
            let more = getCombinations(remainingArrangement.slice(writeIndex), remainingGroups.slice(1));
            more.forEach(m => {
                let copyArr = [...combo1];
                copyArr = copyArr.concat(m);
                combos.push(copyArr);
            });
        }
    } 
    return combos;
}

function log(msg, level) {
    if (level ==1) logger.log(msg);
}