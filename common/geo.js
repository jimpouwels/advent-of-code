export function toPointsList(point1, point2) {
    const allPoints = [];

    const diffX = point1.x < point2.x ? 1 : point1.x > point2.x ? -1 : 0;
    const diffY = point1.y < point2.y ? 1 : point1.y > point2.y ? -1 : 0;

    for (let x = point1.x, y = point1.y; x != point2.x || y != point2.y; x += diffX, y += diffY) {
        allPoints.push({ x: x, y: y });
    }
    allPoints.push(point2);
    return allPoints;
}