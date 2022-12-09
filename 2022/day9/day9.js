export default function run(lines, numberOfKnots) {
    const deltas = parseMoves(lines);
    const knots = createKnots(numberOfKnots);
    const head = knots[0];
    const tail = knots[knots.length - 1];
    const followingKnots = knots.slice(1);

    deltas.forEach(delta => {
        head.add(delta);
        let knotToFollow = head;
        followingKnots.forEach(knot => {
            knot.follow(knotToFollow);
            knotToFollow = knot;
        });
    });
    return tail.uniquePositions.length;
}

function parseMoves(lines) {
    return lines.flatMap(line => {
        const split = line.split(' ');
        const value = parseInt(split[1]);
        switch (split[0]) {
            case 'R':
                return createDeltas({ x: 1, y: 0 }, value);
            case 'L':
                return createDeltas({ x: -1, y: 0 }, value);
            case 'U':
                return createDeltas({ x: 0, y: 1 }, value);
            case 'D':
                return createDeltas({ x: 0, y: -1 }, value);
        }
    });
}

function createDeltas(delta, count) {
    return Array(count).fill(delta);
}

function createKnots(count) {
    return Array(count).fill(0).map(_i => new Knot());
}

class Knot {
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