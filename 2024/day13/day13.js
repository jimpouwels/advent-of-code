import Machine from "./model/machine";
import Button from "./model/button";
import Prize from "./model/prize";

export default function run(input) {
    let machines = input.split('\n\n').map(m => {
        let parts = m.split('\n');
        return new Machine(parseButton(parts[0]), parseButton(parts[1]), parsePrize(parts[2]));
    });
    console.log(machines);
    return 0;
}

function parseButton(parts) {
    let deltas = parts.split(': ')[1].split(', ');
    return new Button(parseInt(deltas[0].split('+')[1]), parseInt(deltas[1].split('+')[1]));
}

function parsePrize(parts) {
    let coords = parts.split(': ')[1].split(', ');
    return new Prize(parseInt(coords[0].split('=')[1]), parseInt(coords[1].split('=')[1]));
}