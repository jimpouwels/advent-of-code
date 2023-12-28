import Logger from "../../common/logger";

let logger = Logger.getLogger('2023-day14');

export default function run(lines) {
    let platform = lines.map(l => l.split(''));
    logger.logGrid(platform, (g) => g);
    
    platform.forEach((row, y) => {
        row.forEach((_, x) => {
            if (y === 0 || platform[y][x] !== 'O') return;
            let nextY = y;
            platform[y][x] = '.';
            while (true) {
                if ((nextY - 1) < 0 || ['O', '#'].includes(platform[nextY - 1][x])) {
                    break;
                }
                nextY--;
            }
            platform[nextY][x] = 'O';
        });
    });
    return platform.reverse().reduce((sum, row, i) => {
        return sum + row.reduce((sum, item) => {
            return sum + (item === 'O' ? i + 1 : 0);
        }, 0);
    }, 0);
}