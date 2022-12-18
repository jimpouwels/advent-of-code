let valves;
export default function run(lines) {
    const pressureAccumulator = {
        pressure: 0
    }
    valves = parseValves(lines, pressureAccumulator);
    // const paths = createPathsFrom(valves);

    const valveAa = valves[0];
    const valveGg = valves[6];

    console.log(`>>> path from ${valveAa.name} to ${valveGg.name}`);

    console.log(valveAa.findPathTo(valveGg));

    return {
        part1: pressureAccumulator.pressure
    }
}

function parseValves(lines, pressureAccumulator) {
    const valveMap = [];
    const valves = lines.map(line => {
        const { valve, rate, targets } = line.match(/Valve (?<valve>([A-Z]+)) has flow rate=(?<rate>(\d+)); tunnel[s]? lead[s]? to valve[s]? (?<targets>[A-Z, ]+)/).groups;
        valveMap[valve] = targets.split(', ');
        return new Valve(valve, +rate, pressureAccumulator);
    });
    valves.forEach(valve => {
        valveMap[valve.name].forEach(t => {
            valve.targets.push(valves.find(v => v.name == t));
        });
    });
    return valves;
}

function createPathsFrom(valves) {
    const paths = [];
    for (let i = 0; i < valves.length - 1; i++) {
        for (let j = 1; j < valves.length; j++) {
            paths.push(valves[i].findPathTo(valves[j]));
        }
    }
    return paths;
}

class Valve {
    name;
    rate;
    targets = [];
    isOpen = false;
    pressureAccumulator;

    constructor(name, rate, pressureAccumulator) {
        this.name = name;
        this.rate = rate;
        this.pressureAccumulator = pressureAccumulator;
    }
    
    onMinutePassed() {
        if (this.isOpen) {
            this.pressureAccumulator.pressure += this.rate;
        }
    }

    open() {
        this.isOpen = true;
    }

    findPathTo(otherValve, visited = []) {
        visited.push(this.name);
        console.log('find path to ' + otherValve.name + ' within ' + this.name);
        if (otherValve.name === this.name) {
            return [ this.name ];
        } else {
            const eligableTargets = this.targets.filter(t => !visited.includes(t.name));
            console.log(`eligable targets: ${eligableTargets.length}`);
            if (eligableTargets.length == 0) {
                console.log(`reached a point we already visited`);
                return [ this.name ];
            }
            console.log(`eligable targets (after) ${eligableTargets.length}`);
            const shortestPath = eligableTargets.map(t => {
                                                    console.log('found target ' + t.name + ' within ' + this.name);
                                                    return t.findPathTo(otherValve, visited)
                                                })
                                                .filter(p => p[p.length - 1] == otherValve.name);
            if (!shortestPath || shortestPath.length == 0) {
                return [ this.name ];
            } else {
                return [ this.name, ...shortestPath.sort((a, b) => a.length - b.length)[0] ];
            }
        }
    }

}