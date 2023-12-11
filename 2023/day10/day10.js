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
        currentPosition.distance = pathLength;

        let left = findConnectorAt(currentPosition, network, currentPosition.x - 1, currentPosition.y);
        let right = findConnectorAt(currentPosition, network, currentPosition.x + 1, currentPosition.y);
        let above = findConnectorAt(currentPosition, network, currentPosition.x, currentPosition.y - 1);
        let below = findConnectorAt(currentPosition, network, currentPosition.x, currentPosition.y + 1);
        if (right) {
            currentPosition = right;
        } else if (left) {
            currentPosition = left;
        } else if (above) {
            currentPosition = above;
        } else if (below) {
            currentPosition = below;
        } else {
            break;
        }
        pathLength++;
    }
    return pathLength;
}

function findConnectorAt(position, network, x, y) {
    let connector = network.getPosition(x, y);
    if (connector instanceof Pipe && connector.distance == -1 && connector.canConnect(position)) {
        return connector;
    }
    return null;
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