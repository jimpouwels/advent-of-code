import Grid from '../../common/grid/grid';

export default function run(input) {
    let grid = new Grid(input, v => v);
    let startPosition = grid.findFirst('S');
    let path = findPath(grid, [], startPosition)
    return path.points;
}

function findPath(grid, seen, currentPosition) {
    let points = 1;
    if (seen.slice(-2).x != currentPosition.x && seen.slice(-2).y != currentPosition.y) {
        points += 1000;
    }
    seen.push(currentPosition);
    let neighbours = grid.findNeighbours(currentPosition, p => p.value != '#' && p.value != 'S' && !seen.some(x => x == p));
    let end = neighbours.filter(p => p.value == 'E')[0];
    if (end) {
        return new Path([currentPosition, end], points);
    }
    let shortestPath = null;
    if (neighbours.length == 0) {
        return null;
    }
    neighbours.forEach(next => {
        let pathFromHere = findPath(grid, [...seen], next);
        if ((pathFromHere && shortestPath) && (shortestPath.points == 0 || pathFromHere.points < shortestPath.points)) {
            shortestPath = pathFromHere;
        }
    });
    if (!shortestPath || shortestPath.path.length == 0) {
        return null;
    }
    console.log(shortestPath);
    return new Path([currentPosition, ...shortestPath.path], shortestPath.points);
}

class Path {
    path = [];
    points = 0;

    constructor(path, points) {
        this.path = [...path];
        this.points = points;
    }
}