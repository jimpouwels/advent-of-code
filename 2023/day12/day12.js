import Logger from "../../common/logger";

let logger = Logger.getLogger('2023-day12');

export default function run(lines) {
    let total = 0;
    lines.forEach((line, i) => {
        logger.log('puzzle ' + i);
        const { arrangementString, groupsString } = line.match(/(?<arrangementString>.*) (?<groupsString>.*)/).groups;
        let groups = groupsString.split(',').map(g => parseInt(g));
        let arrangement = arrangementString.split('');
        
    
        let combos = doIt(arrangement, groups, 1);
    
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

function doIt(remainingArrangement, remainingGroups, level = 9999) {
    let combos = [];
    if (remainingGroups.length > 0) {
        for (let i = 0; i < remainingArrangement.length; i++) {
            let req = i + (remainingGroups.length - 1) + remainingGroups.reduce((sum, val) => sum + val, 0);
            if (req > remainingArrangement.length) {
                continue;
            }
            let posCount = 0;
            let combo1 = [];
            for (let j = 0; j < i; j++) {
                combo1.push('.');
                posCount++
            }
            for (let j = 0; j < remainingGroups[0]; j++) {
                combo1.push('#');
                posCount++
            }
            if (remainingGroups.length > 1) {
                posCount++;
                combo1.push('.');
            } 
            if (remainingGroups.length == 1) {
                for (let j = 0; j < remainingArrangement.length - posCount; j++) {
                    combo1.push('.');
                }
                combos.push(combo1);
                continue;
            }
            let requiredPlaces = (remainingGroups.filter((r, i) => i > 0).length - 1) + remainingGroups.filter((r, i) => i > 0).reduce((sum, val) => sum + val, 0);
            if (requiredPlaces <= 0) { 
                combos.push[combo1];
                continue;
            }
            let availablePlaces = remainingArrangement.length - posCount;
            if (requiredPlaces <= availablePlaces) {
                let more = doIt(remainingArrangement.slice(posCount), remainingGroups.slice(1));
                more.forEach(m => {
                    let copyArr = [...combo1];
                    copyArr = copyArr.concat(m);
                    combos.push(copyArr);
                });
            } else {
                return [combo1];
            }
        }
    } 
    return combos;
}

function log(msg, level) {
    if (level ==1) logger.log(msg);
}