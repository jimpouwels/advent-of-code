export default function run(lines) {
    const moves = parseMoves(lines);
    const head = { x: 0, y: 0 };
    const tail = { x: 0, y: 0, visitedPlaces: [] };
    
    moves.forEach(move => {
        add(head, move);
        follow(tail, head);
    });
    return tail.visitedPlaces.length;
}

function follow(point, pointToFollow) {
    if (Math.abs(pointToFollow.x - point.x) > 1) {
        if (Math.abs(pointToFollow.y - point.y) > 0) {
            point.y += pointToFollow.y > point.y ? 1 : -1;    
        }
        point.x += pointToFollow.x > point.x ? 1 : -1;
    } else if (Math.abs(pointToFollow.y - point.y) > 1) {
        if (Math.abs(pointToFollow.x - point.x) > 0) {
            point.x += pointToFollow.x > point.x ? 1 : -1;    
        }
        point.y += pointToFollow.y > point.y ? 1 : -1;
    }
    if (!point.visitedPlaces.find(p => p.x == point.x && p.y == point.y)) {
        point.visitedPlaces.push({ x: point.x, y: point.y} );
    }
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