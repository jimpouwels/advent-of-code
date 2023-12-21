import Pattern from "./pattern";

let cache = new Map();
export default function run(lines) {
    let part1 = 0;
    lines.forEach(line => {
        let data = parseLine(line);
        let combos = getCombinations(data.springs, new Pattern(data.patterns));
        
        part1 += combos;
    });

    let part2 = 0;
    lines.forEach(line => {
        let data = parseLine(line);
        let patternsExpanded = Array(5).fill(data.patterns).flat();
        let springsExpanded = Array(5).fill(data.springs).join('?');
        let combos = getCombinations(springsExpanded, new Pattern(patternsExpanded));
        part2 += combos;
    });
    return {
        part1: part1,
        part2: part2
    };
}

function parseLine(line) {
    const { springs, patternsString } = line.match(/(?<springs>.*) (?<patternsString>.*)/).groups;
    let patterns = patternsString.split(',').map(g => parseInt(g));
    return {springs: springs, patterns: patterns};
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
        if (pattern.numbers[0] <= springs.length && 
            !springs.slice(0, pattern.numbers[0]).includes('.') && 
            (pattern.numbers[0] === springs.length || springs[pattern.numbers[0]] != '#')) {
            total += getCombinations(springs.slice(pattern.numbers[0] + 1), new Pattern(pattern.numbers.slice(1)));
        }
    }
    
    cache.set(springs + pattern.stringValue, total);
    return total;
}