export default function day8(input) {
    const treeRows = parseForest(input);
    
    const numberOfVisibleTrees = treeRows.flatMap((treeRow, rowIndex) => treeRow.filter((tree, treeIndex) =>
            isOuterTree(treeRow, rowIndex, treeIndex, treeRows) ||
            isVisibleFromLeft(treeRow, treeIndex, tree) ||
            isVisibleFromRight(treeRow, treeIndex, tree) ||
            isVisibleFromTop(treeRows, rowIndex, treeIndex, tree) ||
            isVisibleFromBottom(treeRows, rowIndex, treeIndex, tree
    ))).length;

    let highestScenicScore = Math.max(...treeRows.flatMap((treeRow, rowIndex) => treeRow.map((tree, treeIndex) => {
        return getScoreFor(tree, getTreesAbove(treeRows, rowIndex, treeIndex)) *
               getScoreFor(tree, getTreesToLeft(treeRow, treeIndex)) *
               getScoreFor(tree, getTreesBelow(treeRows, rowIndex, treeIndex)) *
               getScoreFor(tree, getTreesToRight(treeRow, treeIndex));
    })));

    return {
        part1: numberOfVisibleTrees,
        part2: highestScenicScore
    };
}

function getScoreFor(treehouseHeight, treesAdjacent) {
    let score = 0;
    for (const tree of treesAdjacent) {
        score++;
        if (tree >= treehouseHeight) {
            break;
        }
    }
    return score;
}

function isVisibleFromBottom(forest, rowIndex, treeIndex, tree) {
    return Math.max(...getTreesBelow(forest, rowIndex, treeIndex)) < tree;
}

function isVisibleFromTop(forest, rowIndex, treeIndex, tree) {
    return Math.max(...getTreesAbove(forest, rowIndex, treeIndex)) < tree;
}

function isVisibleFromRight(treeRow, treeIndex, tree) {
    return Math.max(...getTreesToRight(treeRow, treeIndex)) < tree;
}

function isVisibleFromLeft(treeRow, treeIndex, tree) {
    return Math.max(...getTreesToLeft(treeRow, treeIndex)) < tree;
}

function isOuterTree(treeRow, rowIndex, treeIndex, forest) {
    return rowIndex == 0 || rowIndex == forest.length - 1 || 
           treeIndex == 0 || treeIndex == treeRow.length - 1;
}

function getTreesToLeft(treeRow, treeIndex) {
    return treeRow.slice(0, treeIndex).reverse();
}

function getTreesToRight(treeRow, treeIndex) {
    return treeRow.slice(treeIndex + 1, treeRow.length);
}

function getTreesAbove(forest, rowIndex, treeIndex) {
    return forest.filter((_row, index) => index < rowIndex)
          .map(row => row[treeIndex]).reverse();
}

function getTreesBelow(forest, rowIndex, treeIndex) {
    return forest.filter((_row, index) => index > rowIndex)
                 .map(row => row[treeIndex]);
}

function parseForest(input) {
    return input.map(line => line.split('')
                .flatMap(tree => parseInt(tree)));
}