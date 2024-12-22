export const Direction = {
    North: 'north',
    South: 'south',
    East: 'east',
    West: 'west'
}

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