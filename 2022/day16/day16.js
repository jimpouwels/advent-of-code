export default function run(lines) {
    const pressureAccumulator = {
        pressure: 0
    }
    const valves = parseValves(lines, pressureAccumulator);
    let currentValve = valves[0];
    for (let i = 0; i < 30; i++) {
        console.log(currentValve);
        valves.forEach(valve => valve.onMinutePassed());
        if (currentValve.rate > 0 && !currentValve.isOpen) {
            currentValve.open();
        } else {
            currentValve = currentValve.moveToHighestValuedValve();
        }
    }

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

    moveToHighestValuedValve() {
        return this.targets
            .filter(t => !t.isOpen)
            .sort((a, b) => b.rate - a.rate)[0];
    }
}