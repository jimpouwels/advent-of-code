import Map from './map.js';
import Range from './range.js';

export default function run(lines) {
    let maps = parseMaps(lines);
    let seeds = parseSeeds(lines[0]);

    // PART 1
    let part1 = Math.min(...seeds.map(seed => {
        let outlet = seed;
        maps.forEach(m => {
            outlet = m.findOutlets(outlet);
        });
        return outlet;
    }));

    // PART 2
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