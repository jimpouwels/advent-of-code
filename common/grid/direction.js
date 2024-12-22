export const Direction = {
    Left: 'left',
    Right: 'right',
    Up: 'up',
    Down: 'down'
}

export function directionFrom(char) {
    switch (char) {
        case '<':
            return Direction.Left;
        case '>':
            return Direction.Right;
        case '^':
            return Direction.Up;
        case 'v':
            return Direction.Down;
    }
}