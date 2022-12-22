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

    for (const step of path) {
        let remainingMinutes = 30;
        for (let i = 0; i <= path.indexOf(step); i++) {
            if (path[i] == step) {
                score += remainingMinutes * path[i].valve.rate;
            }
            remainingMinutes -= (path[i].travelTime + MINUTES_TO_OPEN);
        }
    }
    return score;
}

function createPaths(currentValve, allNonZeroValves, routes, remainingMinutes, openValves = []) {
    const paths = [];
    if (!allNonZeroValves.find(v => !openValves.includes(v.name) && v.name !== currentValve.name)) {
        paths.push([ new Step(currentValve, [])]);
    } else {
        const possibleTargets = allNonZeroValves.filter(v => !openValves.includes(v.name));
        for (const targetValve of possibleTargets) {
            if (targetValve === currentValve) {
                paths.push([ new Step(currentValve, []) ]);
                continue;
            }
            const route = findRoute(routes, currentValve, targetValve);
            if ((route.length + MINUTES_TO_OPEN + 1) > remainingMinutes) {
                paths.push([ new Step(currentValve, []) ]);
            } else {
                for (const subPath of createPaths(targetValve, allNonZeroValves, routes, remainingMinutes - route.length - MINUTES_TO_OPEN, [...openValves, currentValve.name])) {
                    paths.push([ new Step(currentValve, route), ...subPath ]);
                }
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
            valve.targets.push(valves.find(v => v.name == t));
        });
    });
    return valves;
}

function createRoutes(valves, routes) {
    for (let i = 0; i < valves.length - 1; i++) {
        for (let j = 1; j < valves.length; j++) {
            if (valves[i] == valves[j]) {
                continue;
            }
            const route = { from: valves[i], to: valves[j], path: valves[i].findPathTo(valves[j], routes).slice(1) };
            routes.push(route);
        }
    }
}

function findRoute(routes, from, to) {
    let foundRoute = routes.find(r => (r.from === from && r.to === to));
    if (!foundRoute) {
        return routes.find(r => (r.from === to && r.to === from)).path.reverse();
    }
    return foundRoute.path;
}