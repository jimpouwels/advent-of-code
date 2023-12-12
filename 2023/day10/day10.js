import Network from "./network";
import Position from "./position";
import Pipe from "./pipe";
import Logger from "../../common/logger";

let logger = Logger.getLogger('2023-day10');

export default function run(lines) {
    let network = parseNetwork(lines);

    let pathLength = calculateDistances(network.startPipe, network);
    let part2 = calculateEnclosedPositions(network);

    logger.logGrid(network.network, (a) => a.value);
    return {
        part1: Math.ceil(pathLength / 2),
        part2: part2
    }
}

function calculateEnclosedPositions(network) {
    let noPipes = network.network.flatMap(n => n.filter(n => !(n instanceof Pipe) || ((n instanceof Pipe) && !n.onPath)));
    return noPipes.filter(pos => {
        let southCount = castSouth(pos, network);
        let northCount = castNorth(pos, network);
        let eastCount = castEast(pos, network);
        let westCount = castWest(pos, network);
        if ((southCount % 2 == 1) && (northCount % 2 == 1) && (westCount % 2 == 1) && (eastCount % 2 == 1)) {
            pos.value = '*';
            return true;
        }
    }).length;
}

function castWest(pos, network) {
    let crossings = 0;
    let previous = null;
    for (let x = pos.x - 1; x >= 0; x--) {
        let p = network.getPosition(x, pos.y);
        if (!p.onPath) {
            previous = null;
            continue;
        }
        if (p.value == '|') {
            previous = null;
            crossings++;
            continue;
        }
        if (p.value == '-') {
            continue;
        }
        if (p.value == 'L' && previous == '7') {
            previous = null;
            crossings++;
            continue;
        } 
        if (p.value == 'F' && previous == 'J') {
            previous = null;
            crossings++;
            continue;
        }
        previous = p.value;
    }
    return crossings;
}

function castEast(pos, network) {
    let crossings = 0;
    let previous = null;
    for (let x = pos.x + 1; x < network.getWidth(); x++) {
        let p = network.getPosition(x, pos.y);
        if (!p.onPath) {
            previous = null;
            continue;
        }
        if (p.value == '|') {
            previous = null;
            crossings++;
            continue;
        }
        if (p.value == '-') {
            continue;
        }
        if (p.value == '7' && previous == 'L') {
            previous = null;
            crossings++;
            continue;
        } 
        if (p.value == 'J' && previous == 'F') {
            previous = null;
            crossings++;
            continue;
        } 
        previous = p.value;
    }
    return crossings;
}

function castNorth(pos, network) {
    let crossings = 0;
    let previous = null;
    for (let y = pos.y - 1; y >= 0; y--) {
        let p = network.getPosition(pos.x, y);
        if (!p.onPath) {
            previous = null;
            continue;
        }
        if (p.value == '-') {
            previous = null;
            crossings++;
            continue;
        }
        if (p.value == '|') {
            continue;
        }
        if (p.value == '7' && previous == 'L') {
            previous = null;
            crossings++;
            continue;
        } 
        if (p.value == 'F' && previous == 'J') {
            previous = null;
            crossings++;
            continue;
        }
        previous = p.value;
    }
    return crossings;
}

function castSouth(pos, network) {
    let crossings = 0;
    let previous = null;
    for (let y = pos.y + 1; y < network.getHeight(); y++) {
        let p = network.getPosition(pos.x, y);
        if (!p.onPath) {
            previous = null;
            continue;
        }
        if (p.value == '-') {
            previous = null;
            crossings++;
            continue;
        }
        if (p.value == '|') {
            continue;
        }
        if (p.value == 'L' && previous == '7') {
            previous = null;
            crossings++;
            continue;
        } 
        if (p.value == 'J' && previous == 'F') {
            previous = null;
            crossings++;
            continue;
        } 
        previous = p.value;
    }
    return crossings;
}

function calculateDistances(startPipe, network) {
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
                    return new Position(item, x, y);
                case 'S':
                    startPipe = new Pipe('J', x, y, false, false, false, false);
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