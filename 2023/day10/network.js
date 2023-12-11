import Pipe from "./pipe";

export default class Network {
    network;
    startPipe;

    constructor(network, startPipe) {
        this.network = network;
        this.startPipe = startPipe;
    }

    getConnectorFor(position) {
        return [this.getPosition(position.x - 1, position.y),
                this.getPosition(position.x + 1, position.y),
                this.getPosition(position.x, position.y - 1),
                this.getPosition(position.x, position.y + 1)].filter(p => p instanceof Pipe &&
                                                                          !p.handled &&
                                                                          position.isConnector(p))[0];
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