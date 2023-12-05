export default function run(lines) {
    let maps = parseMaps(lines);
    let seeds = parseSeeds(lines[0]);

    let closest = Math.min(...seeds.map(seed => {
        let out = null;
        maps.forEach(m => {
            out = m.nav(out ? out : seed);
        });
        return out;
    }));

    return {
        part1: closest,
        part2: 0
    }
}

function parseSeeds(line) {
    return line.split(': ').slice(1).flatMap(s => s.split(' ').map(i => parseInt(i)));
}

function parseMaps(lines) {
    return lines.slice(2).join('\n').split('\n\n')
                .flatMap(mapString => parseMap(mapString));
}

function parseMap(mapString) {
    return mapString.split('\n\n')
                    .map(mapArr => {
                        let map = new Map();
                        mapArr.split('\n').forEach(((m, i) => {
                            if (i === 0) {
                                return null;
                            }
                            let rangeSplit = m.split(' ').map(r => parseInt(r));
                            map.setIn(rangeSplit[1], rangeSplit[2]);
                            map.setOut(rangeSplit[0], rangeSplit[2]);
                        }));
                        
                        return map;
                    });
}

class Map {
    ins = [];
    outs = [];

    nav(nr) {
        let rangeIndex = -1;
        let index = -1;
        for (let i = 0; i < this.ins.length; i++) {
            if (nr >= this.ins[i].from && nr <= this.ins[i].to) {
                rangeIndex = i;
                index = nr - this.ins[i].from;
                break;
            }
        }
        let result = nr;
        if (index !== -1) {
            result = this.outs[rangeIndex].from + index;
        }
        return result;
    }

    setIn(from, length) {
        this.ins.push(new Range(from, from + length));
    }

    setOut(from, length) {
        this.outs.push(new Range(from, from + length));
    }
}

class Range {
    from;
    to;

    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
}