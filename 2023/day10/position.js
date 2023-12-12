export default class Position {
    value;
    x;
    y;

    constructor(value, x, y) {
        this.value = value;
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