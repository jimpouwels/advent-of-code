let valves;
export default function run(lines) {
    const pressureAccumulator = {
        pressure: 0
    }
    valves = parseValves(lines, pressureAccumulator);
    const routes = [];
    createRoutes(valves, routes);
    console.log(`routes done: ${routes.length}`);
    const highestScore = createPaths(true, valves[0], valves.filter(v => v.rate > 0), routes).highestScore;

    return {
        part1: highestScore
    }
}

function tryPath(path) {
    for (let i = 0; i < 30; i++) {
        valves.forEach(v => v.tick());
        if (path.length === 0) {
            continue;
        }
        path[0].do();
        if (path[0].routeMinutes <= 0) {
            path.shift();
        }
    }
    const score = valves.reduce((a, b) => a + b.pressure, 0);
    valves.forEach(v => {
        v.isOpen = false;
        v.pressure = 0;
    });
    return score;
}

function createPaths(isRoot, currentValve, allNonZeroValves, routes, openValves = []) {
    let highestScore = 0;
    const paths = [];
    if (!allNonZeroValves.find(v => !openValves.includes(v.name) && v.name != currentValve.name)) {
        if (isRoot) {
            highestScore = Math.max(highestScore, tryPath([ new Open(currentValve )]));
        } else {
            paths.push([ new Open(currentValve)]);
        }
        return { paths: paths, highestScore: highestScore };
    }
    const possibleTargets = allNonZeroValves.filter(v => !openValves.includes(v.name));

    for (const targetValve of possibleTargets) {
        if (targetValve === currentValve) {
            continue;
        }
        const route = routes.find(r => r.from === currentValve && r.to === targetValve).path;
        for (const subPath of createPaths(false, targetValve, allNonZeroValves, routes, [...openValves, currentValve.name]).paths) {
            if (isRoot) {
                highestScore = Math.max(highestScore, tryPath([ new Open(currentValve, route.length), ...subPath ]));
            } else {
                paths.push([ new Open(currentValve, route.length), ...subPath ]);
            }
        }
    }
    return { paths: paths, highestScore: highestScore };
}

class Open {
    valve;
    routeMinutes;

    constructor(valve, routeMinutes = 0) {
        this.valve = valve;
        this.routeMinutes = routeMinutes;
    }

    do() {
        if (!this.valve.isOpen && this.valve.name !== 'AA') {
            this.valve.open();
        } else {
            this.routeMinutes--;
        }
    }

    stringify() {
        return `Open: ${this.valve.name}`;
    }
}

function parseValves(lines) {
    const valveMap = [];
    const valves = lines.map(line => {
        const { valve, rate, targets } = line.match(/Valve (?<valve>([A-Z]+)) has flow rate=(?<rate>(\d+)); tunnel[s]? lead[s]? to valve[s]? (?<targets>[A-Z, ]+)/).groups;
        valveMap[valve] = targets.split(', ');
        return new Valve(valve, +rate);
    });
    valves.forEach(valve => {
        valveMap[valve.name].forEach(t => {
            valve.targets.push(valves.find(v => v.name == t));
        });
    });
    return valves;
}

function createRoutes(valves, routes) {
    for (let i = 0; i < valves.length - 1; i++) {
        for (let j = 1; j < valves.length; j++) {
            routes.push( { from: valves[i], to: valves[j], path: valves[i].findPathTo(valves[j], routes).slice(1) });
            routes.push( { from: valves[j], to: valves[i], path: valves[i].findPathTo(valves[j], routes).reverse().slice(1) });
        }
    }
}

class Valve {
    name;
    rate;
    targets = [];
    isOpen = false;
    pressure = 0;

    constructor(name, rate) {
        this.name = name;
        this.rate = rate;
    }

    open() {
        this.isOpen = true;
    }

    tick() {
        if (this.isOpen) {
            this.pressure += this.rate;
        }
    }

    findPathTo(otherValve, routes, visited = []) {
        visited.push(this.name);
        if (otherValve !== this) {
            const existing = routes.find(r => r.from == this && r.to == otherValve);
            if (existing) {
                return [ this, ...existing.path ];
            }
            const shortestPath = this.targets.filter(t => !visited.includes(t.name))
                                             .map(t => t.findPathTo(otherValve, routes, JSON.parse(JSON.stringify(visited))))
                                             .filter(p => p[p.length - 1] == otherValve)
                                             .sort((a, b) => a.length - b.length)[0];
            return shortestPath ? [ this, ...shortestPath ] : [ this ];
        }
        return [ this ];
    }

}