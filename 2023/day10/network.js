import Pipe from "./pipe";

export default class Network {
    network;
    startPipe;

    constructor(network, startPipe) {
        this.network = network;
        this.startPipe = startPipe;
        this.resolveStartPipe();
    }

    getConnectingPipeFor(position) {
        return this.getAdjacentPipes(position).filter(p => p && !p.onPath && position.isConnector(p))[0];
    }

    getAdjacentPipes(position) {
        return [this.getPipeLeftOf(position),
                this.getPipeRightOf(position),
                this.getPipeAbove(position),
                this.getPipeBelow(position)].filter(p => p);
    }

    resolveStartPipe() {
        this.getAdjacentPipes(this.startPipe).forEach(p => {
            if (p.isRightOf(this.startPipe)) {
                this.startPipe.eastOutlet = p.westOutlet;
            } else if (p.isLeftOf(this.startPipe)) {
                this.startPipe.westOutlet = p.eastOutlet;
            } else if (p.isAbove(this.startPipe)) {
                this.startPipe.northOutlet = p.southOutlet;
            } else if (p.isBelow(this.startPipe)) {
                this.startPipe.southOutlet = p.northOutlet;
            }
        });
    }

    isEnclosedVertically(position) {
        let crossings = 0;
        let previous = null;
        for (let y = 0; y < this.getHeight(); y++) {
            let p = this.getPosition(position.x, y);
            if (p == position) {
                if (crossings % 2 != 1) {
                    return false;
                }
                crossings = 0;
                previous = null;
                continue;
            }
            if (!p.onPath) {
                continue;
            }
            if ((previous == '7' && p.value == 'L') ||
                (previous == 'F' && p.value == 'J') ||
                p.value == '-') {
                previous = null;
                crossings++;
            } else if (['J', 'F', 'L', '7'].includes(p.value)) {
                previous = p.value;
            }
        }
        return crossings % 2 == 1;
    }

    isEnclosedHorizontally(position) {
        let crossings = 0;
        let previous = null;
        for (let x = 0; x < this.getWidth(); x++) {
            let p = this.getPosition(x, position.y);
            if (p == position) {
                if (crossings % 2 != 1) {
                    return false;
                }
                crossings = 0;
                previous = null;
                continue;
            }
            if (!p.onPath) {
                continue;
            }
            if ((previous == 'L' && p.value == '7') ||
                ( previous == 'F' && p.value == 'J') ||
                p.value == '|') {
                previous = null;
                crossings++;
            } else if (['J', 'F', 'L', '7'].includes(p.value)) {
                previous = p.value;
            }
        }
        return crossings % 2 == 1;
    }

    getOffPathPositions() {
        return this.network.flatMap(n => n.filter(n => !(n instanceof Pipe) || ((n instanceof Pipe) && !n.onPath)));
    }

    getPipeLeftOf(position) {
        return this.getPipeAt(position.x - 1, position.y);
    }

    getPipeRightOf(position) {
        return this.getPipeAt(position.x + 1, position.y);
    }

    getPipeAbove(position) {
        return this.getPipeAt(position.x, position.y - 1);
    }

    getPipeBelow(position) {
        return this.getPipeAt(position.x, position.y + 1);
    }

    getPipeAt(x, y) {
        if (x >= 0 && x < this.network[0].length &&
            y >= 0 && y < this.network.length) {
            let position = this.network[y][x];
            if (position instanceof Pipe) {
                return position;
            }
        }
    }

    getPosition(x, y) {
        return this.network[y][x];
    }

    getHeight() {
        return this.network.length;
    }

    getWidth() {
        return this.network[0].length;
    }

    toString() {
        let networkAsString = '';
        this.network.forEach(row => {
            row.forEach(element => networkAsString += element.value);
            networkAsString += '\n';
        });
        return networkAsString;
    }
}