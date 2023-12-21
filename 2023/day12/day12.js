import Pattern from "./pattern";

let cache = new Map();
export default function run(lines, expandTimes) {
    let result = 0;
    lines.forEach(line => {
        let data = parseLine(line);
        let patternsExpanded = Array(expandTimes).fill(data.patterns).flat();
        let springsExpanded = Array(expandTimes).fill(data.springs).join('?');
        let combos = getCombinations(springsExpanded, new Pattern(patternsExpanded));
        result += combos;
    });
    return result;
}

function getCombinations(springs, pattern) {
    if (springs.length == 0) {
        return pattern.length == 0 ? 1 : 0;
    }
    if (pattern.length == 0) {
        return !springs.includes('#') ? 1 : 0;
    }

    if (cache.has(springs + pattern.stringValue)) {
        return cache.get(springs + pattern.stringValue);
    }

    let total = 0;
    if ([".", "?"].includes(springs[0])) {
        total += getCombinations(springs.slice(1), pattern);
    }
    if (["?", "#"].includes(springs[0])) {
        if (pattern.first() <= springs.length && 
            !springs.slice(0, pattern.first()).includes('.') && 
            (pattern.first() === springs.length || springs[pattern.first()] != '#')) {
            total += getCombinations(springs.slice(pattern.first() + 1), new Pattern(pattern.numbers.slice(1)));
        }
    }
    
    cache.set(springs + pattern.stringValue, total);
    return total;
}

function parseLine(line) {
    const { springs, patternsString } = line.match(/(?<springs>.*) (?<patternsString>.*)/).groups;
    let patterns = patternsString.split(',').map(g => parseInt(g));
    return {springs: springs, patterns: patterns};
}