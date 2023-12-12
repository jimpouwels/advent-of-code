import Position from "./position";

export default class Pipe extends Position {
    onPath = false;
    hasWestOutlet = false;
    hasSouthOutlet = false;
    hasNorthOutlet = false;
    hasEastOutlet = false;

    constructor(value, x, y, hasNorthOutlet, hasEastOutlet, hasSouthOutlet, hasWestOutlet) {
        super(value, x, y);
        this.hasNorthOutlet = hasNorthOutlet;
        this.hasEastOutlet = hasEastOutlet;
        this.hasSouthOutlet = hasSouthOutlet;
        this.hasWestOutlet = hasWestOutlet;
    }

    isConnector(otherPipe) {
        return this.hasNorthOutlet && otherPipe.hasSouthOutlet && this.isBelow(otherPipe) || 
               this.hasSouthOutlet && otherPipe.hasNorthOutlet && this.isAbove(otherPipe) ||
               this.hasWestOutlet && otherPipe.hasEastOutlet && this.isRightOf(otherPipe) || 
               this.hasEastOutlet && otherPipe.hasWestOutlet && this.isLeftOf(otherPipe) ||
               otherPipe.isStartPipe();
    }

    isVertical() {
        return this.hasNorthOutlet && this.hasSouthOutlet;
    }

    isHorizontal() {
        return this.hasEastOutlet && this.hasWestOutlet;
    }

    isStartPipe() {
        return this.hasNorthOutlet && this.hasSouthOutlet && this.hasEastOutlet && this.hasWestOutlet;
    }

    isCorner() {
        return this.isBottomRightCorner() || this.isTopLeftCorner() || this.isTopRightCorner() || this.isBottomLeftCorner();
    }

    isBottomLeftCorner() {
        return this.hasNorthOutlet && this.hasEastOutlet;
    }

    isBottomRightCorner() {
        return this.hasNorthOutlet && this.hasWestOutlet;
    }

    isTopRightCorner() {
        return this.hasWestOutlet && this.hasSouthOutlet;
    }

    isTopLeftCorner() {
        return this.hasEastOutlet && this.hasSouthOutlet;
    }
}