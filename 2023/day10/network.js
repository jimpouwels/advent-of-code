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
        if (x >= 0 && x < this.network[0].length - 1 &&
            y >= 0 && y < this.network.length) {
            let position = this.network[y][x];
            if (position instanceof Pipe) {
                return position;
            }
        }
    }
}