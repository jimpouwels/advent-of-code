import { max } from "../../common/math";
import Step from "./step";
import Valve from "./valve";

const MINUTES_TO_OPEN = 1;

export default function run(lines) {
    const valves = parseValves(lines);
    const routes = [];
    createRoutes(valves, routes);
    return {
        part1: calculateHighestPressure(valves.find(x => x.name === 'AA'), valves.filter(v => v.rate > 0), routes, 30)
    }
}

function calculateHighestPressure(currentValve, valvesWithPressure, routes, remainingMinutes, openValves = []) {
    let highest = 0;
    const possibleTargets = valvesWithPressure.filter(v => !openValves.includes(v.name));
    let highestTargetScore = 0;
    for (const targetValve of possibleTargets) {
        if (targetValve === currentValve) {
            highest = remainingMinutes * currentValve.rate;
            continue;
        }
        const route = findRoute(routes, currentValve, targetValve);
        if ((route.length + MINUTES_TO_OPEN + 1) <= remainingMinutes) {
            const newRemainingMinutes = remainingMinutes - route.length - MINUTES_TO_OPEN;
            const targetScore = calculateHighestPressure(targetValve, valvesWithPressure, routes, newRemainingMinutes, [ ...openValves, currentValve.name]);
            highestTargetScore = Math.max(highestTargetScore, targetScore);
        }
    }
    return highest + highestTargetScore;
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