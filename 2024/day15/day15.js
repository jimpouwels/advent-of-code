import Grid from '../../common/grid/grid';
import { directionFrom } from '../../common/grid/direction';

export default function run(input) {
    let split = input.split('\n\n');
    let grid = new Grid(split[0].split('\n'), v => v);
    let commands = split[1].split('').filter(c => c != '\n');

    commands.forEach(c => swapIfRoom(grid.findFirst('@'), grid, directionFrom(c)));
    return grid.find('O').reduce((sum, val) => sum + (100 * val.y + val.x), 0);
}

function swapIfRoom(currentPosition, grid, direction) {
    let next = grid.next(currentPosition, direction);
    switch (next.value) {
        case '#':
            return false;
        case '.':
            currentPosition.swap(next);
            return true;
        case 'O':
            if (swapIfRoom(next, grid, direction)) {
                currentPosition.swap(next)
                return true;
            }
    }
}