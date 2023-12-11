import Network from "./network";
import Position from "./position";
import Pipe from "./pipe";

export default function run(lines) {
    let network = parseNetwork(lines);
    let pathLength = calculateDistances(network.startPipe, network);
    return Math.ceil(pathLength / 2);
}

function calculateDistances(startPipe, network) {
    let pathLength = 0;
    let currentPipe = startPipe;
    while (true) {
        currentPipe.handled = true;
        currentPipe = network.getConnectingPipeFor(currentPipe);
        if (!currentPipe) {
            break;
        }
        pathLength++;
    }
    return pathLength;
}

function parseNetwork(lines) {
    let startPipe = null;
    let data = lines.map((l, y) => {
        return l.split('').map((item, x) => {
            switch (item) {
                case '.':
                    return new Position(x, y);
                case 'S':
                    startPipe = new Pipe(x, y, true, true, true, true);
                    return startPipe;
                case '|':
                    return new Pipe(x, y, true, false, true, false);
                case 'L':
                    return new Pipe(x, y, true, true, false, false);
                case 'J':
                    return new Pipe(x, y, true, false, false, true);
                case '7':
                    return new Pipe(x, y, false, false, true, true);
                case 'F':
                    return new Pipe(x, y, false, true, true, false);
                case '-':
                    return new Pipe(x, y, false, true, false, true);
            }
            return item;
        });
    });
    return new Network(data, startPipe);
}