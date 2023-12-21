import Logger from "../../common/logger";

let logger = Logger.getLogger('2023-day12');

export default function run(lines) {
    let part1 = 0;
    lines.forEach((line, i) => {
        const { arrangementString, groupsString } = line.match(/(?<arrangementString>.*) (?<groupsString>.*)/).groups;
        let groups = groupsString.split(',').map(g => parseInt(g));
        let combos = getCombinations(arrangementString, new Group(groups));
        
        part1 += combos;
    });

    let part2 = 0;
    lines.forEach((line, i) => {
        const { arrangementString, groupsString } = line.match(/(?<arrangementString>.*) (?<groupsString>.*)/).groups;
        let groups = groupsString.split(',').map(g => parseInt(g));
        
        let newGroups = Array(5).fill(groups).flat();
        let newArrangements = Array(5).fill(arrangementString).join('?');
        let combos = getCombinations(newArrangements, new Group(newGroups));
        part2 += combos;
    });
    return {
        part1: part1,
        part2: part2
    };
}

let cache = new Map();

function getCombinations(remainingArrangement, remainingGroups) {
    if (remainingArrangement.length == 0) {
        return remainingGroups.length == 0 ? 1 : 0;
    }
    if (remainingGroups.length == 0) {
        return !remainingArrangement.includes('#') ? 1 : 0;
    }

    if (cache.has(remainingArrangement + remainingGroups.stringValue)) {
        return cache.get(remainingArrangement + remainingGroups.stringValue);
    }

    let total = 0;
    if ([".", "?"].includes(remainingArrangement[0])) {
        total += getCombinations(remainingArrangement.slice(1), remainingGroups);
    }
    if (["?", "#"].includes(remainingArrangement[0])) {
        if (remainingGroups.groups[0] <= remainingArrangement.length && !remainingArrangement.slice(0, remainingGroups.groups[0]).includes('.') && (remainingGroups.groups[0] === remainingArrangement.length || remainingArrangement[remainingGroups.groups[0]] != '#')) {
            total += getCombinations(remainingArrangement.slice(remainingGroups.groups[0] + 1), new Group(remainingGroups.groups.slice(1)));
        }
    }
    
    cache.set(remainingArrangement + remainingGroups.stringValue, total);
    return total;
}

class Group {
    groups;
    stringValue;
    length;

    constructor(groups) {
        this.groups = groups;
        this.length = groups.length;
        this.stringValue = groups.join(',');
    }
}