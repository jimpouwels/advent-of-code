import Logger from "../../common/logger";

let logger = Logger.getLogger('day16');

export default function run(lines) {
    let layout = lines.map(l => l.split('').map(i => {
        return { val: i, hit: false};
    }));
    checkPosition(layout, 0, 0, 1, 0, []);
    let count = 0;
    layout.forEach(element => {
        element.forEach(e => {
            if (e.hit) {
                count++;
            }
        });
    });
    return count;
}

function checkPosition(layout, x, y, moveX, moveY, seen) {
    if (x < 0 || x == layout[0].length || y < 0 || y == layout.length) return;
    let current = layout[y][x];
    if (seen.filter(c => {
        return c.x === x && c.y === y && c.moveX === moveX && c.moveY === moveY;
    }).length > 0) {
        return;
    } else {
        seen.push({x: x, y: y, moveX: moveX, moveY: moveY});
    }
    current.hit = true;
    if (current.val === '.') {
        checkPosition(layout, x + moveX, y + moveY, moveX, moveY, seen);
    } else if (current.val == '\\' && moveX > 0) {
        checkPosition(layout, x, y + 1, 0, 1, seen);
    } else if (current.val == '\\' && moveX < 0) {
        checkPosition(layout, x, y - 1, 0, -1, seen);
    } else if (current.val == '\\' && moveY > 0) {
        checkPosition(layout, x + 1, y, 1, 0, seen);
    } else if (current.val == '\\' && moveY < 0) {
        checkPosition(layout, x - 1, y, -1, 0, seen);
    } else if (current.val == '/' && moveX > 0) {
        checkPosition(layout, x, y - 1, 0, -1, seen);
    } else if (current.val == '/' && moveX < 0) {
        checkPosition(layout, x, y + 1, 0, 1, seen);
    } else if (current.val == '/' && moveY > 0) {
        checkPosition(layout, x - 1, y, -1, 0, seen);
    } else if (current.val == '/' && moveY < 0) {
        checkPosition(layout, x + 1, y, 1, 0, seen);
    } else if (current.val == '-' && moveX != 0) {
        checkPosition(layout, x + moveX, y, moveX, moveY, seen);
    } else if (current.val == '-' && moveY != 0) {
        checkPosition(layout, x - 1, y, -1, 0, seen);
        checkPosition(layout, x + 1, y, 1, 0, seen);
    } else if (current.val == '|' && moveY != 0) {
        checkPosition(layout, x, y + moveY, moveX, moveY, seen);
    } else if (current.val == '|' && moveX != 0) {
        checkPosition(layout, x, y - 1, 0, -1, seen);
        checkPosition(layout, x, y + 1, 0, 1, seen);
    }
}