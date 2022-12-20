export function toPointsList(point1, point2) {
    const allPoints = [];
    
    let diffX = 0, diffY = 0;
    if (point1.x < point2.x) {
        diffX = 1;
    } else if (point1.x > point2.x) {
        diffX = -1;
    }
    if (point1.y < point2.y) {
        diffY = 1;
    } else if (point1.y > point2.y) {
        diffY = -1;
    }

    for (let x = point1.x, y = point1.y; x != point2.x || y != point2.y; x += diffX, y += diffY) {
        allPoints.push({ x: x, y: y });
    }
    allPoints.push(point2);
    return allPoints;
}