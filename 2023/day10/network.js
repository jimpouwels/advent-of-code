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
        return [this.getPosition(position.x - 1, position.y),
                this.getPosition(position.x + 1, position.y),
                this.getPosition(position.x, position.y - 1),
                this.getPosition(position.x, position.y + 1)].filter(p => p instanceof Pipe &&
                                                                          !p.handled &&
                                                                          position.isConnector(p))[0];
    }

    getPosition(x, y) {
        if (y >= 0 && y < this.network.length && 
            x >= 0 && x < this.network[0].length - 1) {
            let position = this.network[y][x];
            if (position instanceof Pipe) {
                return position;
            }
        }
    }

    getAdjacentPipes(position) {
        return [this.getPipeLeftOf(position),
                this.getPipeRightOf(position),
                this.getPipeAbove(position),
                this.getPipeBelow(position.x)].filter(p => p instanceof Pipe);
    }

    resolveStartPipe() {
        let west, east, north, south = false;

        let left = this.getPipeLeftOf(this.startPipe);
        if (left && this.startPipe.isConnector(left)) {
            if (left.eastOutlet) {
                west = true;
            }
        }
        let right = this.getPipeRightOf(this.startPipe);
        if (right && this.startPipe.isConnector(left)) {
            if (right.westOutlet) {
                east = true;
            }
        }
        let above = this.getPipeAbove(this.startPipe);
        if (above && this.startPipe.isConnector(above)) {
            if (above.southOutlet) {
                north = true;
            }
        }
        let below = this.getPipeBelow(this.startPipe);
        if (below && this.startPipe.isConnector(below)) {
            if (below.northOutlet) {
                south = true;
            }
        }
        this.startPipe.westOutlet = west;
        this.startPipe.eastOutlet = east;
        this.startPipe.northOutlet = north;
        this.startPipe.southOutlet = south;
    }

    getPipeLeftOf(position) {
        return this.getPosition(position.x - 1, position.y);
    }

    getPipeRightOf(position) {
        return this.getPosition(position.x + 1, position.y);
    }

    getPipeAbove(position) {
        return this.getPosition(position.x, position.y - 1);
    }

    getPipeBelow(position) {
        return this.getPosition(position.x, position.y + 1);
    }
}