export default function run(input) {
    const blocks = input.split('\n\n');
    const drawNumbers = parseDrawnNumbers(blocks[0]);
    const boards = blocks.slice(1).map(b => b.split('\n')
                                    .flatMap((row, rowIndex) => row.trim().replaceAll('  ', ' ').split(' ')
                                    .map((column, columnIndex) => ({ value: +column, row: rowIndex, column: columnIndex, checked: false }))));

    let part1 = 0;
    for (const number of drawNumbers) {
        drawNumber(number, boards);
        const winningBoard = boards.find(b => hasBingo(b));
        if (winningBoard) {
            part1 = winningBoard.reduce((sum, val) => sum + (!val.checked ? val.value : 0), 0) * number;
            break;
        }
    }
    return {
        part1: part1
    }
}

function drawNumber(number, boards) {
    boards.forEach(board => board.filter(box => box.value == number)
                                 .forEach(box => box.checked = true));
}

function hasBingo(board) {
    for (let i = 0; i < 5; i++) {
        if (board.filter(b => b.column == i && b.checked).length == 5 ||
            board.filter(b => b.row == i && b.checked).length == 5) {
                return true;
            }
    }
    return false;
}

function parseDrawnNumbers(line) {
    return JSON.parse(`[${line}]`);
}