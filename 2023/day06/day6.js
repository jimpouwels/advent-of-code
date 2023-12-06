
export default function run(lines) {

    let racesPart1 = parseRaces(lines);
    let racesPart2 = parseRaces(lines, true);

    let part1 = racesPart1.map(race => {
        let sum = 0;
        for (let i = 0; i < race.time; i++) {
            if (i * (race.time - i) > race.distance) {
                sum++;
            }
        }
        return sum;
    }).reduce((sum, val) => sum * val, 1);

    let part2 = 0;
    for (let i = 0; i < racesPart2[0].time; i++) {
        if (i * (racesPart2[0].time - i) > racesPart2[0].distance) {
            part2++;
        }
    }

    return {
        part1: part1,
        part2: part2
    }
}

function parseRaces(lines, ignoreWhitespace = false) {
    const { timesString } = lines[0].match(/Time:( +)(?<timesString>.*)/).groups;
    const { distancesString } = lines[1].match(/Distance:( +)(?<distancesString>.*)/).groups;
    let times = parseValues(timesString, ignoreWhitespace);
    let distances = parseValues(distancesString, ignoreWhitespace);
    return times.map((time, i) => new Race(time, distances[i]));
}

function parseValues(valuesString, ignoreWhitespace = false) {
    if (ignoreWhitespace) {
        valuesString = valuesString.replaceAll(' ', '');
    }
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