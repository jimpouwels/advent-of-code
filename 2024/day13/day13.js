import Machine from "./model/machine";
import Button from "./model/button";
import Prize from "./model/prize";
import { leastCommonDiviser } from "../../common/math";

export default function run(input, further = 0) {
    let machines = parseMachines(input, further);
    return machines.reduce((sum, val, i) => {
        let tokens = press(val, i);
        return sum + ((tokens < Number.MAX_VALUE) ? tokens : 0);
    }, 0);
}

function press(machine, i) {
    let x = 0;
    let y = 0;
    while (x < machine.prize.x && y < machine.prize.y) {
        x += machine.buttonA.xDelta;
        y += machine.buttonA.yDelta;
        let distanceToPrize = { x: machine.prize.x - x, y: machine.prize.y - y };
        if ((distanceToPrize.x % machine.buttonB.xDelta == 0) && (distanceToPrize.y % machine.buttonB.yDelta == 0)
            && (distanceToPrize.x / machine.buttonB.xDelta == distanceToPrize.y / machine.buttonB.yDelta)) {
            return ((x / machine.buttonA.xDelta) * 3) + (distanceToPrize.x / machine.buttonB.xDelta);
        }
        if (distanceToPrize.x == 0 && distanceToPrize.y == 0) {
            return ((x / machine.buttonA.xDelta) * 3);
        }
    }
    return Number.MAX_VALUE;
};

function parseMachines(input, further) {
    return input.split('\n\n').map(m => {
        let parts = m.split('\n');
        return new Machine(parseButton(parts[0], 3), parseButton(parts[1], 1), parsePrize(parts[2], further));
    });
}

function parseButton(parts, cost) {
    let deltas = parts.split(': ')[1].split(', ');
    return new Button(parseInt(deltas[0].split('+')[1]), parseInt(deltas[1].split('+')[1]), cost);
}

function parsePrize(parts, further) {
    let coords = parts.split(': ')[1].split(', ');
    return new Prize(parseInt(coords[0].split('=')[1]) + further, parseInt(coords[1].split('=')[1]) + further);
}