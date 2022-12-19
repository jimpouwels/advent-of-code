export function toPointsList(point1, point2) {
    const allPoints = [];
    const linePoints = [ point1, point2 ].sort((a, b) => (a.x - b.x) + (a.y - b.y));

    for (let x = linePoints[0].x; x <= linePoints[1].x; x++) {
        for (let y = linePoints[0].y; y <= linePoints[1].y; y++) {
            allPoints.push({ x: x, y: y });
        }
    }
    return allPoints;
}