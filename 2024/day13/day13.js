import Machine from "./model/machine";
import Button from "./model/button";
import Prize from "./model/prize";

export default function run(input, further = 0) {
    return parseMachines(input, further).reduce((sum, m) => {
        let d = m.buttonA.xDelta * m.buttonB.yDelta - m.buttonA.yDelta * m.buttonB.xDelta;
        let result = ((m.prize.x * m.buttonB.yDelta - m.prize.y * m.buttonB.xDelta) / d * m.buttonA.tokenCost) +
            (((m.buttonA.xDelta * m.prize.y - m.buttonA.yDelta * m.prize.x) / d) * m.buttonB.tokenCost);
        return sum + (result % 1 == 0 ? result : 0);
    }, 0);
}

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