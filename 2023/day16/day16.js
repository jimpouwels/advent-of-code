import { cloneMatrix } from "../../common/arrays";
import Logger from "../../common/logger";

let logger = Logger.getLogger('day16');

export default function run(lines) {
    let layout = lines.map(l => l.split('').map(i => {
        return { val: i, hit: false};
    }));

    // Part 1
    let layoutP1 = cloneMatrix(layout, i => {return {val: i.val, hit: i.hit}});
    checkPosition(layoutP1, 0, 0, 1, 0, []);
    let part1 = 0;
    layoutP1.forEach(element => {
        element.forEach(e => {
            if (e.hit) {
                part1++;
            }
        });
    });

    // Part 2
    let part2 = 0;
    for (let y = 0; y < layout.length; y++) {
        let count = 0;
        let cloneLayout = cloneMatrix(layout, i => {return {val: i.val, hit: i.hit}});
        checkPosition(cloneLayout, 0, y, 1, 0, []);
        cloneLayout.forEach(element => {
            element.forEach(e => {
                if (e.hit) {
                    count++;
                }
            });
        });
        if (count > part2) {
            part2 = count;
        }
    }
    for (let y = 0; y < layout.length; y++) {
        let count = 0;
        let cloneLayout = cloneMatrix(layout, i => {return {val: i.val, hit: i.hit}});
        checkPosition(cloneLayout, layout[0].length - 1, y, -1, 0, []);
        cloneLayout.forEach(element => {
            element.forEach(e => {
                if (e.hit) {
                    count++;
                }
            });
        });
        if (count > part2) {
            part2 = count;
        }
    }
    for (let x = 0; x < layout[0].length; x++) {
        let count = 0;
        let cloneLayout = cloneMatrix(layout, i => {return {val: i.val, hit: i.hit}});
        checkPosition(cloneLayout, x, 0, 0, 1, []);
        cloneLayout.forEach(element => {
            element.forEach(e => {
                if (e.hit) {
                    count++;
                }
            });
        });
        if (count > part2) {
            part2 = count;
        }
    }
    for (let x = 0; x < layout[0].length; x++) {
        let count = 0;
        let cloneLayout = cloneMatrix(layout, i => {return {val: i.val, hit: i.hit}});
        checkPosition(cloneLayout, x, layout.length - 1, 0, -1, []);
        cloneLayout.forEach(element => {
            element.forEach(e => {
                if (e.hit) {
                    count++;
                }
            });
        });
        if (count > part2) {
            part2 = count;
        }
    }

    return {
        part1: part1,
        part2: part2
    };
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