export default function run(lines, numberOfKnots) {
    const deltas = parseMoves(lines);
    const knots = createKnots(numberOfKnots);
    const head = knots[0];
    const followingKnots = knots.slice(1);
    const tail = knots[knots.length -1];

    deltas.forEach(delta => {
        move(head, delta);
        let knotToFollow = head;
        followingKnots.forEach(knot => {
            follow(knot, knotToFollow);
            knotToFollow = knot;
        });
    });
    return tail.visitedPlaces.length;
}

function follow(knot, knotToFollow) {
    followX(knot, knotToFollow);
    followY(knot, knotToFollow);
    if (!knot.visitedPlaces.find(p => p.x == knot.x && p.y == knot.y)) {
        knot.visitedPlaces.push({ x: knot.x, y: knot.y });
    }
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
    move(knot, { x: knotToFollow.x > knot.x ? 1 : -1, y: 0 });
}

function moveTowardsY(knot, knotToFollow) {
    move(knot, { x: 0, y: knotToFollow.y > knot.y ? 1 : -1 });
}

function distanceY(knot1, knot2) {
    return Math.abs(knot1.y - knot2.y);
}

function distanceX(knot1, knot2) {
    return Math.abs(knot1.x - knot2.x);
}

function move(knot1, knot2) {
    knot1.x += knot2.x;
    knot1.y += knot2.y;
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

function createDeltas(delta, times) {
    return new Array(times).fill(0).map(_t => delta);
}

function createKnots(count) {
    return new Array(count).fill(0).map(_t => ({ x: 0, y: 0, visitedPlaces: [] }));
}