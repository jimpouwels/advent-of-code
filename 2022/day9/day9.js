export default function run(lines, numberOfKnots) {
    const moves = parseMoves(lines);
    const head = { x: 0, y: 0 };
    const tails = createTails(numberOfKnots);
    
    moves.forEach(move => {
        add(head, move);
        let pointToFollow = head;
        tails.forEach(tail => {
            follow(tail, pointToFollow);
            pointToFollow = tail;
        });
    });
    return tails[tails.length - 1].visitedPlaces.length;
}

function follow(point, pointToFollow) {
    followX(point, pointToFollow);
    followY(point, pointToFollow);
    if (!point.visitedPlaces.find(p => p.x == point.x && p.y == point.y)) {
        point.visitedPlaces.push({ x: point.x, y: point.y });
    }
}

function followX(point, pointToFollow) {
    if (distanceX(point, pointToFollow) > 1) {
        if (distanceY(point, pointToFollow) > 0) {
            moveTowardsY(point, pointToFollow);
        }
        moveTowardsX(point, pointToFollow);
    }
}

function followY(point, pointToFollow) {
    if (distanceY(point, pointToFollow) > 1) {
        if (distanceX(point, pointToFollow) > 0) {
            moveTowardsX(point, pointToFollow);
        }
        moveTowardsY(point, pointToFollow);
    }
}

function moveTowardsX(point, pointToFollow) {
    add(point, { x: pointToFollow.x > point.x ? 1 : -1, y: 0 });
}

function moveTowardsY(point, pointToFollow) {
    add(point, { x: 0, y: pointToFollow.y > point.y ? 1 : -1 });
}

function distanceY(point1, point2) {
    return Math.abs(point1.y - point2.y);
}

function distanceX(point1, point2) {
    return Math.abs(point1.x - point2.x);
}

function add(point1, point2) {
    point1.x += point2.x;
    point1.y += point2.y;
}

function parseMoves(lines) {
    return lines.flatMap(line => {
        const split = line.split(' ');
        const value = parseInt(split[1]);
        switch (split[0]) {
            case 'R':
                return repeatPoint({ x: 1, y: 0 }, value);
            case 'L':
                return repeatPoint({ x: -1, y: 0 }, value);
            case 'U':
                return repeatPoint({ x: 0, y: 1 }, value);
            case 'D':
                return repeatPoint({ x: 0, y: -1 }, value);
        }
    });
}

function repeatPoint(point, times) {
    return new Array(times).fill(0).map(_t => { return point });
}

function createTails(count) {
    return new Array(count).fill(0).map(_t => { return { x: 0, y: 0, visitedPlaces: [] } });
}