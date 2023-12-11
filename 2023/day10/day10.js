import Network from "./network";
import Position from "./position";
import Pipe from "./pipe";
import { PipeType } from "./pipe_type";

export default function run(lines) {
    let network = parseNetwork(lines);
    let startPosition = network.getStartPosition();
    
    let pathLength = calculateDistances(startPosition, network);
    return Math.ceil(pathLength / 2);
}

function calculateDistances(startPosition, network) {
    let pathLength = 0;
    let currentPosition = startPosition;
    while (currentPosition.type != PipeType.Intersection || pathLength == 0) {
        currentPosition.handled = true;

        currentPosition = network.getAdjacentPositions(currentPosition).filter(p => p && isConnector(currentPosition, p))[0];
        if (!currentPosition) {
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
                    return new Pipe(PipeType.Intersection, x, y, true, true, true, true);
                case '|':
                    return new Pipe(PipeType.NorthSouth, x, y, true, false, true, false);
                case 'L':
                    return new Pipe(PipeType.NorthEast, x, y, true, true, false, false);
                case 'J':
                    return new Pipe(PipeType.NorthWest, x, y, true, false, false, true);
                case '7':
                    return new Pipe(PipeType.SouthWest, x, y, false, false, true, true);
                case 'F':
                    return new Pipe(PipeType.SouthEast, x, y, false, true, true, false);
                case '-':
                    return new Pipe(PipeType.WestEast, x, y, false, true, false, true);
            }
            return item;
        });
    }));
}