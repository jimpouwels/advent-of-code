
export default function run(lines) {

    let races = parseRaces(lines);

    let part1 = races.map(race => {
        let sum = 0;
        for (let i = 0; i < race.time; i++) {
            if (i * (race.time - i) > race.distance) {
                sum++;
            }
        }
        return sum;
    }).reduce((sum, val) => sum * val, 1);

    return {
        part1: part1,
        part2: 0
    }
}

function parseRaces(lines) {
    const { timesString } = lines[0].match(/Time:( +)(?<timesString>.*)/).groups;
    const { distancesString } = lines[1].match(/Distance:( +)(?<distancesString>.*)/).groups;
    let times = parseValues(timesString);
    let distances = parseValues(distancesString);
    return times.map((time, i) => new Race(time, distances[i]));
}

function parseValues(valuesString) {
    return valuesString.split(/( +)/).filter(t => t.trim()).filter(t => t).map(t => parseInt(t))
}

class Race {
    time;
    distance;

    constructor(time, distance) {
        this.time = time;
        this.distance = distance;
    }
}