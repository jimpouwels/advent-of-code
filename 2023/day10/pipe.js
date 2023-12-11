import Position from "./position";

export default class Pipe extends Position {
    type;
    handled = false;
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