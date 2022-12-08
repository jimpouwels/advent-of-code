export default function day8(input) {
    const forest = parseForest(input);
    
    const numberOfVisibleTrees = forest.flatMap((treeRow, rowIndex) => treeRow.filter((tree, treeIndex) =>
            isOuterTree(treeRow, rowIndex, treeIndex, forest) ||
            isVisibleFromLeft(treeRow, treeIndex, tree) ||
            isVisibleFromRight(treeRow, treeIndex, tree) ||
            isVisibleFromTop(forest, rowIndex, treeIndex, tree) ||
            isVisibleFromBottom(forest, rowIndex, treeIndex, tree
    ))).length;

    return {
        part1: numberOfVisibleTrees,
        part2: 8
    };
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
    return forest.filter(row => forest.indexOf(row) < rowIndex)
          .map(row => row[treeIndex]);
}

function getTreesBelow(forest, rowIndex, treeIndex) {
    return forest.filter(row => forest.indexOf(row) > rowIndex)
                 .map(row => row[treeIndex]);
}

function parseForest(input) {
    return input.map(line => line.split('')
                .flatMap(tree => parseInt(tree)));
}