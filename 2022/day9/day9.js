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
            follow(knot, knotToFollow);
            knotToFollow = knot;
        });
    });
    return tail.uniquePositions.length;
}

function follow(knot, knotToFollow) {
    followX(knot, knotToFollow);
    followY(knot, knotToFollow);
    knot.recordPosition();
}

function followX(knot, knotToFollow) {
    if (distanceX(knot, knotToFollow) > 1) {
        if (distanceY(knot, knotToFollow) > 0) {
            moveTowardsY(knot, knotToFollow);
        }
        moveTowardsX(knot, knotToFollow);
    }
}

function followY(knot, knotToFollow) {
    if (distanceY(knot, knotToFollow) > 1) {
        if (distanceX(knot, knotToFollow) > 0) {
            moveTowardsX(knot, knotToFollow);
        }
        moveTowardsY(knot, knotToFollow);
    }
}

function moveTowardsX(knot, knotToFollow) {
    knot.add({ x: knotToFollow.x > knot.x ? 1 : -1, y: 0 });
}

function moveTowardsY(knot, knotToFollow) {
    knot.add({ x: 0, y: knotToFollow.y > knot.y ? 1 : -1 });
}

function distanceY(knot1, knot2) {
    return Math.abs(knot1.y - knot2.y);
}

function distanceX(knot1, knot2) {
    return Math.abs(knot1.x - knot2.x);
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
    return Array(count).fill(0).map(_i => (
        { 
            x: 0, 
            y: 0,
            uniquePositions: [],
            recordPosition: function() {
                if (!this.uniquePositions.find(p => p.x == this.x && p.y == this.y)) {
                    this.uniquePositions.push({ x: this.x, y: this.y });
                }
            },
            add: function(delta) {
                this.x += delta.x;
                this.y += delta.y;
            }
        }
    ));
}