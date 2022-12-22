import Step from "./step";
import Valve from "./valve";

const MINUTES_TO_OPEN = 1;

export default function run(lines) {
    const valves = parseValves(lines);
    const routes = [];
    createRoutes(valves, routes);
    console.log(`ROUTES COMPLETED: found ${routes.length} routes`);
    const paths = createPaths(valves.find(x => x.name === 'AA'), valves.filter(v => v.rate > 0), routes, 30);
    console.log(`PATHS COMPLETED: found ${paths.length} paths`);
    let highestScore = 0;
    paths.forEach(path => {
        const score = tryPath(path);
        highestScore = Math.max(highestScore, score);
    });
    console.log(`PATHS COMPLETED: ${paths.length} paths tested`);

    return {
        part1: highestScore
    }
}

function tryPath(path) {
    let score = 0;

    let remainingMinutes = 30;
    for (const step of path) {
        score += remainingMinutes * step.rate;
        remainingMinutes -= (step.travelTime + MINUTES_TO_OPEN);
        if (remainingMinutes <= 0) {
            break;
        }
    }
    return score;
}

function createPaths(currentValve, valvesWithPressure, routes, remainingMinutes, openValves = []) {
    const paths = [];
    const possibleTargets = valvesWithPressure.filter(v => !openValves.includes(v.name));
    for (const targetValve of possibleTargets) {
        if (targetValve === currentValve) {
            paths.push([ new Step(currentValve.rate) ]);
            continue;
        }
        const route = findRoute(routes, currentValve, targetValve);
        if ((route.length + MINUTES_TO_OPEN + 1) > remainingMinutes) {
            paths.push([ new Step(currentValve.rate) ]);
        } else {
            for (const subPath of createPaths(targetValve, valvesWithPressure, routes, remainingMinutes - route.length - MINUTES_TO_OPEN, [ ...openValves, currentValve.name])) {
                subPath.unshift(new Step(currentValve.rate, route.length));
                paths.push(subPath);
            }
        }
    }
    return paths;
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
            valve.targets.push(valves.find(v => v.name === t));
        });
    });
    return valves;
}

function createRoutes(valves, routes) {
    for (let i = 0; i < valves.length - 1; i++) {
        const valveFrom = valves[i];
        for (let j = 1; j < valves.length; j++) {
            const valveTo = valves[j];
            if (valveFrom === valveTo) {
                continue;
            }
            const route = { from: valveFrom, to: valveTo, path: valveFrom.findPathTo(valveTo, routes).slice(1) };
            routes.push(route);
        }
    }
}

function findRoute(routes, from, to) {
    return routes.find(r => (r.from === from && r.to === to) || (r.from === to && r.to === from)).path;
}