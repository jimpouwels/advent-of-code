import Network from "./network";
import Position from "./position";
import Pipe from "./pipe";

export default function run(lines) {
    let network = parseNetwork(lines);
    let startPipe = network.getStartPipe();
    console.log(startPipe);
    let pathLength = calculateDistances(startPipe, network);
    return Math.ceil(pathLength / 2);
}

function calculateDistances(startPipe, network) {
    let pathLength = 0;
    let currentPipe = startPipe;
    while (!currentPipe.isStartPipe() || pathLength == 0) {
        currentPipe.handled = true;

        currentPipe = network.getAdjacentPositions(currentPipe).filter(p => p && isConnector(currentPipe, p))[0];
        if (!currentPipe) {
            break;
        }
        pathLength++;
    }
    return pathLength;
}

function isConnector(currentPipe, otherPipe) {
    return otherPipe instanceof Pipe && !otherPipe.handled && currentPipe.canConnect(otherPipe);
}

function parseNetwork(lines) {
    return new Network(lines.map((l, y) => {
        return l.split('').map((item, x) => {
            switch (item) {
                case '.':
                    return new Position(x, y);
                case 'S':                    
                    return new Pipe(x, y, true, true, true, true);
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
    }));
}