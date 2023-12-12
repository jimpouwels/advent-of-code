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
                this.startPipe.hasEastOutlet = p.hasWestOutlet;
            } else if (p.isLeftOf(this.startPipe)) {
                this.startPipe.hasWestOutlet = p.hasEastOutlet;
            } else if (p.isAbove(this.startPipe)) {
                this.startPipe.hasNorthOutlet = p.hasSouthOutlet;
            } else if (p.isBelow(this.startPipe)) {
                this.startPipe.hasSouthOutlet = p.hasNorthOutlet;
            }
        });
    }

    isEnclosed(position) {
        return this.isEnclosedVertically(position) && this.isEnclosedHorizontally(position)
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

    isEnclosedVertically(position) {
        let crossings = 0;
        let previous = null;
    
        for (let y = 0; y < this.getHeight(); y++) {
            let p = this.getPosition(position.x, y);
            if (p == position) {
                if (crossings % 2 != 1) false;
                crossings = 0;
                previous = null;
            } else {
                if (!p.onPath) continue;
                if (((previous?.isTopRightCorner() && p.isBottomLeftCorner()) ||
                    (previous?.isTopLeftCorner() && p.isBottomRightCorner())) ||
                    p.isHorizontal()) {
                    previous = null;
                    crossings++;
                } else if (p.isCorner()) {
                    previous = p;
                }
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
                if (crossings % 2 != 1) false;
                crossings = 0;
                previous = null;
            } else {
                if (!p.onPath) continue;
                if (((previous?.isBottomLeftCorner() && p.isTopRightCorner()) ||
                    (previous?.isTopLeftCorner() && p.isBottomRightCorner())) ||
                    p.isVertical()) {
                    previous = null;
                    crossings++;
                } else if (p.isCorner()) {
                    previous = p;
                }
            }
        }
        return crossings % 2 == 1;
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