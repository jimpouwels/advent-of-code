import Network from "./network";
import Position from "./position";
import Pipe from "./pipe";
import Logger from "../../common/logger";

export default function run(lines) {
    let logger = Logger.getLogger('2023-day10');
    let network = parseNetwork(lines);
    let pathLength = calculateDistances(network.startPipe, network);
    logger.log(network.toString());
    logger.log(network.toString());
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
                    startPipe = new Pipe(item, x, y, false, false, false, false);
                    return startPipe;
                case '|':
                    return new Pipe(item, x, y, true, false, true, false);
                case 'L':
                    return new Pipe(item, x, y, true, true, false, false);
                case 'J':
                    return new Pipe(item, x, y, true, false, false, true);
                case '7':
                    return new Pipe(item, x, y, false, false, true, true);
                case 'F':
                    return new Pipe(item, x, y, false, true, true, false);
                case '-':
                    return new Pipe(item, x, y, false, true, false, true);
            }
            return item;
        });
    });
    return new Network(data, startPipe);
}