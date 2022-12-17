export default function run(lines) {
    const valves = parseValves(lines);
    console.log(valves);
    return {
        part1: 0
    }
}

function parseValves(lines) {
    return lines.map(line => {
        const { valve, rate, targets } = line.match(/Valve (?<valve>([A-Z]+)) has flow rate=(?<rate>(\d+)); tunnel[s]? lead[s]? to valve[s]? (?<targets>[A-Z, ]+)/).groups;
        return {
            name: valve,
            rate: rate,
            targets: targets.split(', ')
        }
    });
}