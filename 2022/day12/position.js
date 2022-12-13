export default class Position {
    
    x = 0;
    y = 0;
    elevation = 0;
    parent = null;
    cost = Infinity;

    constructor(x, y, elevation) {
        this.x = x;
        this.y = y;
        this.elevation = elevation;
    }

    getDepth() {
        if (this.parent) {
            return 1 + this.parent.getDepth();
        }
        return 0;
    }

    getCost(from, to) {
        return this.getDistanceTo(this, from) + this.getDistanceTo(this, to);
    }

    getDistanceTo(otherPosition) {
        return Math.abs(this.x - otherPosition.x) + Math.abs(this.y - otherPosition.y);
    }

    reset() {
        this.cost = Infinity;
        this.parent = null;
    }
}