export default function run(input) {
    const blocks = input.split('\n\n');
    const drawNumbers = parseDrawnNumbers(blocks[0]);
    const boards = blocks.slice(1).map(b => b.split('\n')
                                    .flatMap((row, rowIndex) => row.trim().replaceAll('  ', ' ').split(' ')
                                    .map((column, columnIndex) => ({ value: +column, row: rowIndex, column: columnIndex, checked: false }))));

    let winningBoard = null;
    let winningNumber = -1;
    top: for (const drawNumber of drawNumbers) {
        for (const board of boards) {
            board.forEach(box => {
                if (box.value == drawNumber) {
                    box.checked = true;
                }
                if (hasBingo(board)) {
                    winningBoard = board;
                    winningNumber = drawNumber;
                }
            });
            if (winningBoard) {
                break top;
            }
        };
    }
    return {
        part1: winningBoard.reduce((sum, val) => sum + (!val.checked ? val.value : 0), 0) * winningNumber
    }
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