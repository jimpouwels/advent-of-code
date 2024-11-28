import Gift from "./gift.js";

export default function day2(lines) {
    let gifts = lines.map(l => parseLine(l));
    return {
        part1: gifts.reduce((sum, g) => sum + g.getPaperSize(), 0),
        part2: gifts.reduce((sum, g) => sum + g.getRibbonSize(), 0)
    }
}

function parseLine(l) {
    let split = l.split("x");
    return new Gift(parseInt(split[0]), parseInt(split[1]), parseInt(split[2]));
}