import { PipeType } from "./pipe_type";

export default class Network {
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