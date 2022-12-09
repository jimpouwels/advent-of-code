export default function run(lines) {
    const moves = parseMoves(lines);
    const head = { x: 0, y: 0 };
    const tail = { x: 0, y: 0 };
    moves.forEach(move => {
        add(head, move);
        follow(tail, head);
    });
    console.log(head);
    return 0;
}

function follow(point, pointToFollow) {

}

function add(point1, point2) {
    point1.x += point2.x;
    point1.y += point2.y;
}

function parseMoves(lines) {
    return lines.map(line => {
        const split = line.split(' ');
        const value = parseInt(split[1]);
        switch (split[0]) {
            case 'U':
                return { x: 0, y: value};
            case 'D':
                return { x: 0, y: -value };
            case 'L':
                return { x: -value, y: 0 };
            case 'R':
                return { x: value, y: 0 };
        }
    });
}