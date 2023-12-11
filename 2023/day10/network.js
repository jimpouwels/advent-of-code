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
        return this.getAdjacentPipes(position).filter(p => p && !p.handled && position.isConnector(p))[0];
    }

    getAdjacentPipes(position) {
        return [this.getPipeLeftOf(position),
                this.getPipeRightOf(position),
                this.getPipeAbove(position),
                this.getPipeBelow(position)];
    }

    resolveStartPipe() {
        let left = this.getPipeLeftOf(this.startPipe);
        if (left) {
            this.startPipe.westOutlet = left.eastOutlet;
        }
        let right = this.getPipeRightOf(this.startPipe);
        if (right) {
            this.startPipe.eastOutlet = right.westOutlet;
        }
        let above = this.getPipeAbove(this.startPipe);
        if (above) {
            this.startPipe.northOutlet = above.southOutlet;
        }
        let below = this.getPipeBelow(this.startPipe);
        if (below) {
            this.startPipe.southOutlet = below.northOutlet;
        }
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
        if (y >= 0 && y < this.network.length && 
            x >= 0 && x < this.network[0].length - 1) {
            let position = this.network[y][x];
            if (position instanceof Pipe) {
                return position;
            }
        }
    }
}