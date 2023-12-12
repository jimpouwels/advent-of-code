import Network from "./network";
import Position from "./position";
import Pipe from "./pipe";
import Logger from "../../common/logger";

let logger = Logger.getLogger('2023-day10');

export default function run(lines) {
    let network = parseNetwork(lines);

    let part1 = Math.ceil(calculatePipePathDistance(network.startPipe, network) / 2);
    let part2 = network.getOffPathPositions().filter(pos => network.isEnclosed(pos)).length;

    return {
        part1: part1,
        part2: part2
    }
}

function calculatePipePathDistance(startPipe, network) {
    let pathLength = 0;
    let currentPipe = startPipe;
    while (true) {
        currentPipe.onPath = true;
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
                    startPipe = new Pipe(x, y, false, false, false, false);
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