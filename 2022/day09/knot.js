export default class Knot {
    
    x = 0;
    y = 0;
    knotInFront;
    uniquePositions = [];

    constructor(knotInFront) {
        this.knotInFront = knotInFront;
    }

    add(delta) {
        this.x += delta.x;
        this.y += delta.y;
    }

    follow() {
        if (!this.knotInFront) return;
        this.followX();
        this.followY();
        this.recordPosition();
    }

    followX() {
        const distance = this.distanceToKnotInFront();
        if (distance.x > 1) {
            if (distance.y > 0) {
                this.moveTowardsKnotInFrontY();
            }
            this.moveTowardsKnotInFrontX();
        }
    }
    
    followY() {
        const distance = this.distanceToKnotInFront();
        if (distance.y > 1) {
            if (distance.x > 0) {
                this.moveTowardsKnotInFrontX();
            }
            this.moveTowardsKnotInFrontY();
        }
    }
    
    moveTowardsKnotInFrontX() {
        this.add({ x: this.knotInFront.x > this.x ? 1 : -1, y: 0 });
    }
    
    moveTowardsKnotInFrontY() {
        this.add({ x: 0, y: this.knotInFront.y > this.y ? 1 : -1 });
    }
    
    distanceToKnotInFront() {
        return { x: Math.abs(this.x - this.knotInFront.x), y: Math.abs(this.y - this.knotInFront.y) };
    }
    
    recordPosition() {
        if (!this.uniquePositions.find(p => p.x == this.x && p.y == this.y)) {
            this.uniquePositions.push({ x: this.x, y: this.y });
        }
    }
}