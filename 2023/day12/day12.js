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

function getCombinations(remainingArrangement, remainingGroups) {
    let combos = [];
    if (remainingGroups.length > 0) {
        let stepper = 0;
        let masterCombo = '';
        while (remainingArrangement[stepper] == '.') {
            masterCombo += '.';
            stepper++;
        }
        remainingArrangement = remainingArrangement.slice(stepper);
        for (let gapCount = 0; gapCount < remainingArrangement.length; gapCount++) {
            if (remainingArrangement[0 + gapCount] == '.') {
                continue;
            }
            let req = gapCount + (remainingGroups.length - 1) + remainingGroups.reduce((sum, val) => sum + val, 0);
            if (req > remainingArrangement.length) {
                continue;
            }
            let writeIndex = 0;
            let combo = masterCombo;
            for (let j = 0; j < gapCount; j++) {
                combo += '.';
                writeIndex++
            }
            for (let j = 0; j < remainingGroups[0]; j++) {
                combo += '#';
                writeIndex++
            }
            if (remainingGroups.length > 1) {
                writeIndex++;
                combo += '.';
            }

            // add tail
            if (remainingGroups.length == 1) {
                for (let j = 0; j < remainingArrangement.length - writeIndex; j++) {
                    combo += '.';
                }
                combos.push(combo);
                continue;
            }
            let chunk = remainingArrangement.slice(writeIndex);
            let groupsForChunck = remainingGroups.slice(1);
            let more = getCombinations(chunk, groupsForChunck);
            more.forEach(m => {
                combos.push(combo + m);
            });
            if (remainingArrangement[0 + gapCount] == '#') {
                break;
            }
        }
    } 
    return combos;
}

function log(msg, level) {
    if (level ==1) logger.log(msg);
}