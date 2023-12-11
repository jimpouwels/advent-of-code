export default class Position {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    isAbove(otherPosition) {
        return this.y < otherPosition.y;
    }

    isBelow(otherPosition) {
        return this.y > otherPosition.y;
    }

    isLeftOf(otherPosition) {
        return this.x < otherPosition.x;
    }

    isRightOf(otherPosition) {
        return this.x > otherPosition.x;
    }
    
}