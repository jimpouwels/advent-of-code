import { cloneMatrix } from "../../common/arrays";

export function runPart1(lines) {
    let layout = parseLayout(lines);

    checkPosition(layout, 0, 0, 1, 0, []);
    return countEnergized(layout);
}

export function runPart2(lines) {
    let layout = parseLayout(lines);

    let part2 = 0;
    for (let y = 0; y < layout.length; y++) {
        part2 = Math.max(getHitsForEntry(layout, 0, y, 1, 0), 
                         getHitsForEntry(layout, layout[0].length - 1, y, -1, 0), 
                         part2);
    }
    for (let x = 0; x < layout[0].length; x++) {
        part2 = Math.max(getHitsForEntry(layout, x, 0, 0, 1), 
                         getHitsForEntry(layout, x, layout.length - 1, 0, - 1), 
                         part2);
    }
    return part2;
}

function getHitsForEntry(layout, x, y, moveX, moveY) {
    let cloneLayout = clone(layout);
    checkPosition(cloneLayout, x, y, moveX, moveY, []);
    return countEnergized(cloneLayout);
}

function checkPosition(layout, x, y, moveX, moveY, seen, cache) {
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
    } else if (current.val == '\\' && moveX != 0) {
        checkPosition(layout, x, y + moveX, moveY, moveX, seen);
    } else if (current.val == '\\' && moveY != 0) {
        checkPosition(layout, x + moveY, y + moveX, moveY, moveX, seen);
    } else if (current.val == '/' && moveX != 0) {
        checkPosition(layout, x, y - moveX, moveY, -moveX, seen);
    } else if (current.val == '/' && moveY != 0) {
        checkPosition(layout, x - moveY, y, -moveY, moveX, seen);
    }else if (current.val == '-' && moveX != 0) {
        checkPosition(layout, x + moveX, y, moveX, moveY, seen);
    } else if (current.val == '-' && moveY != 0) {
        checkPosition(layout, x + moveY, y, moveY, moveX, seen);
        checkPosition(layout, x - moveY, y, -moveY, moveX, seen);
    } else if (current.val == '|' && moveY != 0) {
        checkPosition(layout, x, y + moveY, moveX, moveY, seen);
    } else if (current.val == '|' && moveX != 0) {
        checkPosition(layout, x, y + moveX, moveY, moveX, seen);
        checkPosition(layout, x, y - moveX, moveY, -moveX, seen);
    }
}

function countEnergized(layout) {
    return layout.reduce((sum, element) => sum + element.reduce((sum, e) => sum + (e.hit ? 1 : 0), 0), 0);
}

function clone(layout) {
    return cloneMatrix(layout, i => {return {val: i.val, hit: i.hit}});
}

function parseLayout(lines) {
    return lines.map(l => l.split('').map(i => {
        return { val: i, hit: false};
    }));
}