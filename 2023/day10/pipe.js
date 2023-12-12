import Position from "./position";

export default class Pipe extends Position {
    onPath = false;
    westOutlet;
    southOutlet;
    northOutlet;
    eastOutlet;

    constructor(value, x, y, northOutlet, eastOutlet, southOutlet, westOutlet) {
        super(value, x, y);
        this.northOutlet = northOutlet;
        this.eastOutlet = eastOutlet;
        this.southOutlet = southOutlet;
        this.westOutlet = westOutlet;
    }

    isConnector(otherPipe) {
        return this.northOutlet && otherPipe.southOutlet && this.isBelow(otherPipe) || 
               this.southOutlet && otherPipe.northOutlet && this.isAbove(otherPipe) ||
               this.westOutlet && otherPipe.eastOutlet && this.isRightOf(otherPipe) || 
               this.eastOutlet && otherPipe.westOutlet && this.isLeftOf(otherPipe) ||
               otherPipe.isStartPipe();
    }

    isVertical() {
        return this.northOutlet && this.southOutlet;
    }

    isHorizontal() {
        return this.eastOutlet && this.westOutlet;
    }

    isStartPipe() {
        return this.northOutlet && this.southOutlet && this.eastOutlet && this.westOutlet;
    }

    isCorner() {
        return this.isBottomRightCorner() || this.isTopLeftCorner() || this.isTopRightCorner() || this.isBottomLeftCorner();
    }

    isBottomLeftCorner() {
        return this.northOutlet && this.eastOutlet;
    }

    isBottomRightCorner() {
        return this.northOutlet && this.westOutlet;
    }

    isTopRightCorner() {
        return this.westOutlet && this.southOutlet;
    }

    isTopLeftCorner() {
        return this.eastOutlet && this.southOutlet;
    }
}