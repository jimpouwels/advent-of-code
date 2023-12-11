import Position from "./position";

export default class Pipe extends Position {
    handled = false;
    westOutlet;
    southOutlet;
    northOutlet;
    eastOutlet;

    constructor(x, y, northOutlet, eastOutlet, southOutlet, westOutlet) {
        super(x, y);
        this.northOutlet = northOutlet;
        this.eastOutlet = eastOutlet;
        this.southOutlet = southOutlet;
        this.westOutlet = westOutlet;
    }

    isConnector(otherPipe) {
        return this.northOutlet && otherPipe.southOutlet && this.isBelow(otherPipe) || 
               this.southOutlet && otherPipe.northOutlet && this.isAbove(otherPipe) ||
               this.westOutlet && otherPipe.eastOutlet && this.isRightOf(otherPipe) || 
               this.eastOutlet && otherPipe.westOutlet && this.isLeftOf(otherPipe);
    }

    isStartPipe() {
        return this.northOutlet && this.southOutlet && this.eastOutlet && this.westOutlet;
    }
}