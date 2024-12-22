export const Direction = {
    North: 'north',
    South: 'south',
    East: 'east',
    West: 'west',
    NorthWest: 'NorthWest',
    NorthEast: 'NorthEast',
    SouthEast: 'SouthEast',
    SouthWest: 'SoutWest'
}

export const AllDirections = [Direction.North, Direction.South, Direction.East, Direction.West, Direction.NorthEast, Direction.NorthWest, Direction.SouthEast, Direction.SouthWest];
export const StraightDirections = [Direction.North, Direction.South, Direction.West, Direction.East];

export function directionFromString(char) {
    switch (char) {
        case '<':
            return Direction.West;
        case '>':
            return Direction.East;
        case '^':
            return Direction.North;
        case 'v':
            return Direction.South;
    }
}