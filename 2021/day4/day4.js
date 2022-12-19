import Board from "./board.js";

export default function run(input) {
    const inputComponents = input.split('\n\n');
    const drawNumbers = parseDrawnNumbers(inputComponents[0]);
    const boards = parseBoards(inputComponents.slice(1));

    const winningBoards = [];
    drawNumbers.forEach(number => 
        boards.filter(board => !board.score).forEach(board => {
            board.check(number)
            if (board.hasBingo()) {
                winningBoards.push( { board: board, score: board.score });
            }
    }));
    
    return {
        part1: winningBoards[0].score,
        part2: winningBoards[winningBoards.length - 1].score
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