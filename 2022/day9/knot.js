export default class Knot {
    
    x = 0;
    y = 0;
    knotToFollow;
    uniquePositions = [];

    constructor(knotToFollow) {
        this.knotToFollow = knotToFollow;
    }

    add(delta) {
        this.x += delta.x;
        this.y += delta.y;
    }

    follow() {
        if (!this.knotToFollow) return;
        this.followX(this.knotToFollow);
        this.followY(this.knotToFollow);
        this.recordPosition();
    }

    followX(otherKnot) {
        const distance = this.distanceTo(otherKnot);
        if (distance.x > 1) {
            if (distance.y > 0) {
                this.moveTowardsY(otherKnot);
            }
            this.moveTowardsX(otherKnot);
        }
    }
    
    followY(otherKnot) {
        const distance = this.distanceTo(otherKnot);
        if (distance.y > 1) {
            if (distance.x > 0) {
                this.moveTowardsX(otherKnot);
            }
            this.moveTowardsY(otherKnot);
        }
    }
    
    moveTowardsX(otherKnot) {
        this.add({ x: otherKnot.x > this.x ? 1 : -1, y: 0 });
    }
    
    moveTowardsY(otherKnot) {
        this.add({ x: 0, y: otherKnot.y > this.y ? 1 : -1 });
    }
    
    distanceTo(otherKnot) {
        return { x: Math.abs(this.x - otherKnot.x), y: Math.abs(this.y - otherKnot.y) };
    }
    
    recordPosition() {
        if (!this.uniquePositions.find(p => p.x == this.x && p.y == this.y)) {
            this.uniquePositions.push({ x: this.x, y: this.y });
        }
    }
}