import Logger from "../../common/logger";

let logger = Logger.getLogger('2023-day12');

export default function run(lines) {
    let part1 = 0;
    lines.forEach((line, i) => {
        const { arrangementString, groupsString } = line.match(/(?<arrangementString>.*) (?<groupsString>.*)/).groups;
        let groups = groupsString.split(',').map(g => parseInt(g));
        let arrangement = arrangementString.split('');
        
        let combos = getCombinations(arrangement, groups, 1);
        
        let count = 0;
        combos.forEach(c => {
            if (c.split('').filter((item, i) =>{
                return (arrangement[i] == '?' && item == '.') ||
                (arrangement[i] == '?' && item == '#') ||
                (arrangement[i] == '.' && item == '.') ||
                (arrangement[i] == '#' && item == '#');
            }).length == c.length) {
                count++;
            }
        });
        part1 += count;
    });
    let part2 = 0;
    // logger.log('=======================NU PART 2');
    // lines.forEach((line, i) => {
    //     logger.log('puzzle ' + i);
    //     const { arrangementString, groupsString } = line.match(/(?<arrangementString>.*) (?<groupsString>.*)/).groups;
    //     let groups = groupsString.split(',').map(g => parseInt(g));
    //     let arrangement = arrangementString.split('');
        
    //     let newGroups = [];
    //     let newArrangements = [];
    //     for (let i = 0; i < 5; i++) {
    //         newGroups = newGroups.concat(groups);
    //         newArrangements = newArrangements.concat(arrangement);
    //         if (i < 4) {
    //             newArrangements.push('?');
    //         }
    //     }
    //     let combos = getCombinations(newArrangements, newGroups, 1);
    
    //     let count = 0;
    //     combos.forEach(c => {
    //         if (c.filter((item, i) =>{
    //             return (arrangement[i] == '?' && item == '.') ||
    //                    (arrangement[i] == '?' && item == '#') ||
    //                    (arrangement[i] == '.' && item == '.') ||
    //                    (arrangement[i] == '#' && item == '#');
    //         }).length == c.length) {
    //             count++;
    //         }
    //     });
    //     part2 += count;
    // });
    
    return {
        part1: part1,
        part2: part2
    };
}

function getCombinations(remainingArrangement1, remainingGroups) {
    let combos = [];
    let remainingArrangement = [...remainingArrangement1];
    if (remainingGroups.length > 0) {
        let combo = '';
        while (true) {
            if (remainingArrangement[0] == '.') {
                combo += remainingArrangement.shift();
            } else {
                break;
            }
        }
        for (let gapCount = 0; gapCount < remainingArrangement.length; gapCount++) {
            let subCombo = combo;
            let req = gapCount + (remainingGroups.length - 1) + remainingGroups.reduce((sum, val) => sum + val, 0);
            if (req > remainingArrangement.length) {
                break;
            }
            subCombo += addChar('.', gapCount);
            let writeIndex = gapCount;
            
            subCombo += addChar('#', remainingGroups[0]);
            writeIndex += remainingGroups[0];

            if (remainingGroups.length > 1) {
                writeIndex++;
                subCombo += '.';
            }

            // add tail
            if (remainingGroups.length == 1) {
                subCombo += addChar('.', remainingArrangement.length - writeIndex);
                combos.push(subCombo);
                continue;
            }
            let more = getCombinations(remainingArrangement.slice(writeIndex), remainingGroups.slice(1));
            more.forEach(m => {
                combos.push(subCombo + m);
            });
            if (remainingArrangement[0 + gapCount] == '#') {
                break;
            }
        }
    }
    return combos;
}

function addChar(char, times) {
    let val = '';
    for (let i = 0; i < times; i++) {
        val += char;
    }
    return val;
}

function log(msg, level) {
    if (level ==1) logger.log(msg);
}