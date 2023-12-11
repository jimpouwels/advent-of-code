import Pipe from "./pipe";

export default class Network {
    network; 

    constructor(network) {
        this.network = network;
    }

    getAdjacentPositions(position) {
        return [this.getPosition(position.x - 1, position.y),
                this.getPosition(position.x + 1, position.y),
                this.getPosition(position.x, position.y - 1),
                this.getPosition(position.x, position.y + 1)];
    }

    getStartPipe() {
        for (let y = 0; y < this.network.length; y++) {
            for (let x = 0; x < this.network[0].length; x++) {
                let position = this.getPosition(x, y);
                if (position instanceof Pipe && position.isStartPipe()) {
                    return position;
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