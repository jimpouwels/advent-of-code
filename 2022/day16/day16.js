let valves;
export default function run(lines) {
    const pressureAccumulator = {
        pressure: 0
    }
    valves = parseValves(lines, pressureAccumulator);
    const routes = createRoutes(valves);

    console.log(routes.find(r => r.from.name == 'BB' && r.to.name == 'JJ'));
    const paths = createPaths(valves[0], valves.filter(v => v.rate > 0), routes);
    const iWantTo = paths.filter(p => p[0].valve.name === 'DD');
    let count = 0;
    for (const path of paths) {
        if (path[0] instanceof TunnelTo && path[0].valve.name == 'DD') {
            if (path[1] instanceof Open && path[1].valve.name == 'DD') {
                if (path[2] instanceof TunnelTo && path[2].valve.name == 'CC') {
                    if (path[3] instanceof TunnelTo && path[3].valve.name == 'BB') {
                        if (path[4] instanceof Open && path[4].valve.name == 'BB') {
                            if (path[5] instanceof TunnelTo && path[5].valve.name == 'AA') {
                                count++;
                            }
                        }
                    }
                }
            }
        }
    }
    const results = [];
    iWantTo.forEach(p => {
        const thePath = [];
        for (let i = 0; i < 30; i++) {
            valves.forEach(v => v.tick());
            if (p.length == 0) {
                continue;
            }
            p[0].do();
            thePath.push(p.shift());
        }
        results.push({ pathTaken: thePath.map(p => p.stringify()), result: valves.reduce((a, b) => a + b.pressure, 0) });
        valves.forEach(v => {
            v.isOpen = false;
            v.pressure = 0;
        })
    })

    const best = results.sort((a, b) => b.result - a.result)[0];

    return {
        part1: best.result
    }
}

function createPaths(currentValve, allNonZeroValves, routes, openValves = []) {
    const paths = [];
    if (!allNonZeroValves.find(v => !openValves.includes(v.name) && v.name != currentValve.name)) {
        paths.push([ new Open(currentValve )]);
        return paths;
    }
    const possibleTargets = allNonZeroValves.filter(v => !openValves.includes(v.name) && v.name != currentValve.name);

    for (const targetValve of possibleTargets) {
        const route = routes.find(r => r.from == currentValve && r.to == targetValve).path;
        const routePath = [];
        if (currentValve.name != 'AA') {
            routePath.push(new Open(currentValve));
        }
        for (const routePart of route) {
            routePath.push(new TunnelTo(routePart));
        }
        for (const subPath of createPaths(targetValve, allNonZeroValves, routes, [...openValves, currentValve.name])) {
            paths.push([ ...routePath, ...subPath ]);
        }
    }
    return paths;
}

class Open {
    valve;

    constructor(valve) {
        this.valve = valve;
    }

    do() {
        this.valve.open();
    }

    stringify() {
        return `Open: ${this.valve.name}`;
    }

}

class TunnelTo {
    valve;

    constructor(valve) {
        this.valve = valve;
    }

    do() {
        
    }

    stringify() {
        return `Tunnel to: ${this.valve.name}`;
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

function createRoutes(valves) {
    const paths = [];
    for (let i = 0; i < valves.length - 1; i++) {
        for (let j = 1; j < valves.length; j++) {
            paths.push( { from: valves[i], to: valves[j], path: valves[i].findPathTo(valves[j]).slice(1) });
            paths.push( { from: valves[j], to: valves[i], path: valves[i].findPathTo(valves[j]).reverse().slice(1) });
        }
    }
    return paths;
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

    open() {
        this.isOpen = true;
    }

    findPathTo(otherValve, visited = []) {
        visited.push(this.name);
        if (otherValve !== this) {
            const shortestPath = this.targets.filter(t => !visited.includes(t.name))
                                             .map(t => t.findPathTo(otherValve, JSON.parse(JSON.stringify(visited))))
                                             .filter(p => p[p.length - 1] == otherValve)
                                             .sort((a, b) => a.length - b.length)[0];
            return shortestPath ? [ this, ...shortestPath ] : [ this ];
        }
        return [ this ];
    }

}