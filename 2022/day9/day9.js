import Knot from "./knot.js";

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