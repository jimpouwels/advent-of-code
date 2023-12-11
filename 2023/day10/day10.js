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

        let left = findConnector(currentPosition, network, currentPosition.x - 1, currentPosition.y);
        let right = findConnector(currentPosition, network, currentPosition.x + 1, currentPosition.y);
        let above = findConnector(currentPosition, network, currentPosition.x, currentPosition.y - 1);
        let below = findConnector(currentPosition, network, currentPosition.x, currentPosition.y + 1);
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

function findConnector(position, network, x, y) {
    let connector = network.getPosition(x, y);
    if (connector instanceof Pipe && connector.distance == -1 && connector.canConnect(position)) {
        return connector;
    }
    return null;
}

class Network {
    network; 

    constructor(network) {
        this.network = network;
    }

    getStartPosition() {
        for (let y = 0; y < this.network.length; y++) {
            for (let x = 0; x < this.network[0].length; x++) {
                if (this.getPosition(x, y).type == PipeType.Intersection) {
                    return this.getPosition(x, y);
                }
            }
        }
    }

    getPosition(x, y) {
        if (y < 0 || y > this.network.length - 1) {
            return null;
        }
        if (x < 0 || x > this.network[0].length - 1) {
            return null;
        }
        return this.network[y][x];
    }
}

class Position {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    isAbove(otherPosition) {
        return this.y < otherPosition.y;
    }

    isBelow(otherPosition) {
        return this.y > otherPosition.y;
    }

    isLeftOf(otherPosition) {
        return this.x < otherPosition.x;
    }

    isRightOf(otherPosition) {
        return this.x > otherPosition.x;
    }
    
}

class Pipe extends Position {
    type;
    distance = -1;
    westOutlet;
    southOutlet;
    northOutlet;
    eastOutlet;

    constructor(type, x, y, northOutlet, eastOutlet, southOutlet, westOutlet) {
        super(x, y);
        this.type = type;
        this.northOutlet = northOutlet;
        this.eastOutlet = eastOutlet;
        this.southOutlet = southOutlet;
        this.westOutlet = westOutlet;
    }

    canConnect(otherPipe) {
        return otherPipe instanceof Pipe &&
               (this.northOutlet && otherPipe.southOutlet && this.isBelow(otherPipe) || 
                this.southOutlet && otherPipe.northOutlet && this.isAbove(otherPipe) ||
                this.westOutlet && otherPipe.eastOutlet && this.isRightOf(otherPipe) || 
                this.eastOutlet && otherPipe.westOutlet && this.isLeftOf(otherPipe));
    }
}

const PipeType = {
    NorthSouth: "NS",
    NorthEast: "NE",
    NorthWest: "NW",
    SouthWest: "SW",
    SouthEast: "SE",
    WestEast: "WE",
    Intersection: "IS"
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