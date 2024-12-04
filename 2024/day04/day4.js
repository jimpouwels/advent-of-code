export default function run(lines) {
    let grid = lines.map(l => l.split(''));

    return {
        part1: grid.reduce((sum, line, y) =>
            sum + line.reduce((sum, _, x) => sum + allDirections.filter(direction =>
                findAdjacentChars(grid, "XMAS".split(''), { x: x, y: y }, direction)).length, 0), 0),

        part2: grid.reduce((sum, line, y) => sum + line.reduce((sum, _, x) =>
            sum + (findX(grid, { x: x, y: y })), 0), 0)
    }
}

function findAdjacentChars(grid, remainingChars, currentPosition, direction) {
    if (grid[currentPosition.y][currentPosition.x] == remainingChars[0]) {
        if (remainingChars.length == 1) {
            return true;
        }
    } else {
        return false;
    }
    let nextPosition = { x: currentPosition.x, y: currentPosition.y };
    nextPosition.x -= direction == Direction.WEST || direction == Direction.NORTH_WEST || direction == Direction.SOUTH_WEST ? 1 : 0;
    nextPosition.x += direction == Direction.EAST || direction == Direction.NORTH_EAST || direction == Direction.SOUTH_EAST ? 1 : 0;
    nextPosition.y -= direction == Direction.NORTH || direction == Direction.NORTH_EAST || direction == Direction.NORTH_WEST ? 1 : 0;
    nextPosition.y += direction == Direction.SOUTH || direction == Direction.SOUTH_EAST || direction == Direction.SOUTH_WEST ? 1 : 0;

    if (nextPosition.x < 0 || nextPosition.x == grid[0].length || nextPosition.y < 0 || nextPosition.y == grid.length) {
        return false;
    }
    return findAdjacentChars(grid, remainingChars.slice(1), nextPosition, direction);
}

function findX(grid, currentPosition) {
    if (grid[currentPosition.y][currentPosition.x] != 'A' || currentPosition.x < 1 || currentPosition.x == grid[0].length - 1 || currentPosition.y < 1 || currentPosition.y == grid.length - 1) {
        return false;
    }
    return ((grid[currentPosition.y - 1][currentPosition.x - 1] == 'M' && grid[currentPosition.y + 1][currentPosition.x + 1] == 'S')
        || (grid[currentPosition.y - 1][currentPosition.x - 1] == 'S' && grid[currentPosition.y + 1][currentPosition.x + 1] == 'M')) &&
        ((grid[currentPosition.y - 1][currentPosition.x + 1] == 'M' && grid[currentPosition.y + 1][currentPosition.x - 1] == 'S')
            || (grid[currentPosition.y - 1][currentPosition.x + 1] == 'S' && grid[currentPosition.y + 1][currentPosition.x - 1] == 'M'))
}

export const Direction = {
    NORTH: 'North',
    SOUTH: 'South',
    WEST: 'West',
    EAST: 'East',
    NORTH_WEST: 'NorthWest',
    NORTH_EAST: 'NorthEast',
    SOUTH_WEST: 'SoutWest',
    SOUTH_EAST: 'SouthEast'
}
const allDirections = [Direction.NORTH, Direction.SOUTH, Direction.EAST, Direction.WEST, Direction.NORTH_EAST, Direction.NORTH_WEST, Direction.SOUTH_EAST, Direction.SOUTH_WEST];