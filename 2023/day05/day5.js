export default function run(lines) {
    let maps = parseMaps(lines);
    let seeds = parseSeeds(lines[0]);

    let part1 = Math.min(...seeds.map(seed => {
        let outlet = seed;
        maps.forEach(m => {
            outlet = m.findOutlets(outlet);
        });
        return outlet;
    }));

    let seedRanges = [];
    for (let i = 0; i < seeds.length; i += 2) {
        seedRanges.push(new Range(seeds[i], seeds[i] + seeds[i + 1]));
    }
    let outlets = seedRanges;
    maps.forEach(m => {
        outlets = m.findOutletsByRanges(outlets);
    });
    let part2 = Math.min(...outlets.map(outlet => outlet.from));


    return {
        part1: part1,
        part2: part2
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
                            map.addInlet(rangeSplit[1], rangeSplit[2]);
                            map.addOutlet(rangeSplit[0], rangeSplit[2]);
                        }));
                        
                        return map;
                    });
}

class Map {
    inlets = [];
    outlets = [];

    findOutlets(value) {
        let inlet = this.inlets.filter(inlet => value >= inlet.from && value <= inlet.to)[0];
        if (!inlet) {
            return value;
        } else {
            return value + (this.outlets[inlet.index].from - inlet.from);
        }
    }

    findOutletsByRanges(ranges) {
        return ranges.flatMap(range => {
            let outRanges = [];
            let inlet = this.inlets.filter(inlet => (range.from >= inlet.from && range.from < inlet.to) ||
                                         (range.to > inlet.from && range.to <= inlet.to) ||
                                         (range.from < inlet.from && range.to > inlet.to))[0];
            if (!inlet) {
                outRanges.push(new Range(range.from, range.to));
            } else {
                // check range that falls to right of inlet
                if (range.from < inlet.from && range.to <= inlet.to) {
                    outRanges = outRanges.concat(this.findOutletsByRanges([new Range(range.from, inlet.from - 1)]));
                    range.from = inlet.from;
                }
                // check range that falls to left of inlet
                if (range.from >= inlet.from && range.to > inlet.to) {
                    outRanges = outRanges.concat(this.findOutletsByRanges([new Range(inlet.to + 1, range.to)]));
                    range.to = inlet.to + 1;
                }

                let outlet = this.outlets[inlet.index];
                outRanges.push(new Range(range.from + (outlet.from - inlet.from), 
                                         range.to + (outlet.to - inlet.to)));
            }
            return outRanges;
        });
    }

    addInlet(from, length) {
        this.inlets.push(new Range(from, from + length, this.inlets.length));
    }

    addOutlet(from, length) {
        this.outlets.push(new Range(from, from + length, this.inlets.length));
    }
}

class Range {
    from;
    to;
    index;

    constructor(from, to, index) {
        this.from = from;
        this.to = to;
        this.index = index;
    }

    length() {
        return this.to - this.from;
    }
}