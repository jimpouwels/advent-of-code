export default function run(input) {
    const blocks = input.split('\n\n');
    const drawNumbers = parseDrawnNumbers(blocks[0]);
    const boards = blocks.slice(1).map(b => b.split('\n')
                                    .flatMap((row, rowIndex) => row.trim().replace('  ', ' ').split(' ')
                                    .map((column, columnIndex) => ({ value: +column, row: rowIndex, column: columnIndex }))));

    console.log(boards);
    return {
        part1: winningBoard.reduce((sum, val) => sum + val.reduce((sum, val) => sum + val.checked ? val.value : 0 )) * finalNumber
    }
}

function hasBingo(board) {
    
}

function parseDrawnNumbers(line) {
    return JSON.parse(`[${line}]`);
}