import Board from "./board.js";

export default function run(input) {
    const inputComponents = input.split('\n\n');
    const drawNumbers = parseDrawnNumbers(inputComponents[0]);
    const boards = parseBoards(inputComponents.slice(1));

    let part1 = 0;
    drawNumbers.every(number => {
        return boards.every(board => {
            board.check(number)
            if (board.hasBingo()) {
                part1 = board.boxes.reduce((sum, val) => sum + (!val.checked ? val.value : 0), 0) * number;
            }
            return !part1;
        });
    });
    return {
        part1: part1
    }
}

function parseBoards(boardsStrings) {
    return boardsStrings.map(b => new Board(b.split('\n')
        .flatMap((row, rowIndex) => row.trim().replaceAll('  ', ' ').split(' ')
            .map((column, columnIndex) => ({ value: +column, row: rowIndex, column: columnIndex, checked: false }))))
    );
}

function parseDrawnNumbers(line) {
    return JSON.parse(`[${line}]`);
}