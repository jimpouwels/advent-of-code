export default class Knot {
    x = 0;
    y = 0;
    uniquePositions = [];

    recordPosition() {
        if (!this.uniquePositions.find(p => p.x == this.x && p.y == this.y)) {
            this.uniquePositions.push({ x: this.x, y: this.y });
        }
    }

    add(delta) {
        this.x += delta.x;
        this.y += delta.y;
    }

    follow(otherKnot) {
        this.followX(otherKnot);
        this.followY(otherKnot);
        this.recordPosition();
    }

    followX(otherKnot) {
        if (this.distanceXTo(otherKnot) > 1) {
            if (this.distanceYTo(otherKnot) > 0) {
                this.moveTowardsY(otherKnot);
            }
            this.moveTowardsX(otherKnot);
        }
    }
    
    followY(otherKnot) {
        if (this.distanceYTo(otherKnot) > 1) {
            if (this.distanceXTo(otherKnot) > 0) {
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
    
    distanceYTo(otherKnot) {
        return Math.abs(this.y - otherKnot.y);
    }
    
    distanceXTo(otherKnot) {
        return Math.abs(this.x - otherKnot.x);
    }
}