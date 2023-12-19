import Logger from "../../common/logger";

let logger = Logger.getLogger('2023-day12');

export default function run(lines) {
    let part1 = 0;
    lines.forEach((line, i) => {
        const { arrangementString, groupsString } = line.match(/(?<arrangementString>.*) (?<groupsString>.*)/).groups;
        let groups = groupsString.split(',').map(g => parseInt(g));
        let arrangement = arrangementString.split('');
        
        let combos = getCombinations(arrangement, groups);
        
        part1 += combos;
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
    
    //     part2 += combos.length;
    // });
    
    return {
        part1: part1,
        part2: part2
    };
}

function getCombinations(remainingArrangement, remainingGroups, level = 999) {
    let total = 0;
    let currentArrangement = [...remainingArrangement];
    if (remainingGroups.length > 0) {
        let combo = '';
        while (true) {
            if (currentArrangement[0] == '.') {
                combo += currentArrangement.shift();
            } else {
                break;
            }
        }
        gapLoop:
        for (let gapCount = 0; gapCount < currentArrangement.length; gapCount++) {
            let nestedCurrentArrangement = [...currentArrangement];
            let subCombo = combo;
            let req = gapCount + (remainingGroups.length - 1) + remainingGroups.reduce((sum, val) => sum + val, 0);
            if (req > currentArrangement.length) {
                break;
            }
            for (let i = 0; i < gapCount; i++) {
                if (nestedCurrentArrangement[0] == '#') {
                    break gapLoop;
                }
                subCombo += ".";
                nestedCurrentArrangement.shift();
            }
            
            for (let i = 0; i < remainingGroups[0]; i++) {
                if (nestedCurrentArrangement[0] == '.') {
                    continue gapLoop;
                }
                subCombo += '#';
                nestedCurrentArrangement.shift();
            }

            if (remainingGroups.length > 1) {
                if (nestedCurrentArrangement[0] == '#') {
                    continue gapLoop;
                }
                subCombo += '.';
                nestedCurrentArrangement.shift();
            }

            if (remainingGroups.length == 1) {
                let remainingTail = nestedCurrentArrangement.length;
                for (let i = 0; i < remainingTail; i++) {
                    if (nestedCurrentArrangement[0] == '#') {
                        continue gapLoop;
                    }
                    subCombo += ".";
                    nestedCurrentArrangement.shift();
                }
                total++;
                continue;
            }
            total += getCombinations(nestedCurrentArrangement, remainingGroups.slice(1));
            if (currentArrangement[0 + gapCount] == '#') {
                break;
            }
        }
    }
    return total;
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