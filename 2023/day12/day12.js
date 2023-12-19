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
    //     let combos = getCombinations(newArrangements, newGroups);
    
    //     part2 += combos.length;
    // });
    
    return {
        part1: part1,
        part2: part2
    };
}

function getCombinations(remainingArrangement, remainingGroups) {
    let cached = cache.get(remainingArrangement, remainingGroups);
    if (cached) {
        return cached;
    }
    let total = 0;
    let currentArrangement = [...remainingArrangement];
    if (remainingGroups.length > 0) {
        while (true) {
            if (currentArrangement[0] == '.') {
                currentArrangement.shift();
            } else {
                break;
            }
        }
        gapLoop:
        for (let gapCount = 0; gapCount < currentArrangement.length; gapCount++) {
            let nestedCurrentArrangement = [...currentArrangement];
            let nestedGroups = [...remainingGroups];
            let req = gapCount + (remainingGroups.length - 1) + remainingGroups.reduce((sum, val) => sum + val, 0);
            if (req > nestedCurrentArrangement.length) {
                break;
            }
            for (let i = 0; i < gapCount; i++) {
                if (nestedCurrentArrangement[0] == '#') {
                    break gapLoop;
                }
                nestedCurrentArrangement.shift();
            }
            
            for (let i = 0; i < nestedGroups[0]; i++) {
                if (nestedCurrentArrangement[0] == '.') {
                    continue gapLoop;
                }
                nestedCurrentArrangement.shift();
            }
            nestedGroups.shift();

            if (nestedGroups.length > 0) {
                if (nestedCurrentArrangement[0] == '#') {
                    continue gapLoop;
                }
                nestedCurrentArrangement.shift();
            }

            if (nestedGroups.length == 0) {
                let remainingTail = nestedCurrentArrangement.length;
                for (let i = 0; i < remainingTail; i++) {
                    if (nestedCurrentArrangement[0] == '#') {
                        continue gapLoop;
                    }
                    nestedCurrentArrangement.shift();
                }
                total++;
                continue;
            }
            total += getCombinations(nestedCurrentArrangement, nestedGroups);
            if (currentArrangement[0 + gapCount] == '#') {
                break;
            }
        }
    }
    cache.add(remainingArrangement, remainingGroups, total);
    return total;
}

class Pattern {
    groups;
    count;

    constructor(groups) {
        this.groups = groups;
        this.count = groups.reduce((sum, val) => sum + val, 0);
    }

    length() {
        return this.groups.length;
    }

    requiredPlaces() {
        return (this.length() - 1) + this.count;
    }
}

class Item {
    chunk;
    pattern;
    count;

    constructor(chunk, pattern, count) {
        this.chunk = chunk;
        this.pattern = pattern;
        this.count = count;
    }
}

class Cache {
    items = [];

    add(chunk, pattern, count) {
        this.items.push(new Item(chunk, pattern, count));
    }

    get(chunk, pattern) {
        let found = this.items.filter((it, i) => it.chunk.length == chunk.length && it.pattern.length == pattern.length &&
                                                 it.chunk.every((c, k) => c === chunk[k] &&
                                                 it.pattern.every((p, l) => p === pattern[l])));
        if (found.length > 0) {
            return found[0].combinations;
        }
        return null;
    }
}

let cache = new Cache();

function log(msg, level) {
    if (level ==1) logger.log(msg);
}