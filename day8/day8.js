export default function day8(input) {
    const forest = parseForest(input);
    
    let numberOfVisibleTrees = forest.flatMap((treeRow, rowIndex) => treeRow.filter((tree, treeIndex) =>
            isOuterTree(treeRow, rowIndex, treeIndex, forest) ||
            isVisibleFromLeft(treeRow, treeIndex, tree) ||
            isVisibleFromRight(treeRow, treeIndex, tree) ||
            isVisibleFromTop(forest, rowIndex, treeIndex, tree) ||
            isVisibleFromBottom(forest, rowIndex, treeIndex, tree
    ))).length; 

    return {
        part1: numberOfVisibleTrees
    };
}

function isVisibleFromBottom(forest, rowIndex, treeIndex, tree) {
    return Math.max(...getTreesBelow(forest, rowIndex, treeIndex)) < tree;
}

function isVisibleFromTop(forest, rowIndex, treeIndex, tree) {
    return Math.max(...getTreesAbove(forest, rowIndex, treeIndex)) < tree;
}

function isVisibleFromRight(treeRow, treeIndex, tree) {
    return Math.max(...treeRow.slice(treeIndex + 1, treeRow.length)) < tree;
}

function isVisibleFromLeft(treeRow, treeIndex, tree) {
    return Math.max(...treeRow.slice(0, treeIndex)) < tree;
}

function getTreesAbove(forest, rowIndex, treeIndex) {
    return forest.filter(row => forest.indexOf(row) < rowIndex)
          .map(row => row[treeIndex]);
}

function getTreesBelow(forest, rowIndex, treeIndex) {
    return forest.filter(row => forest.indexOf(row) > rowIndex)
                 .map(row => row[treeIndex]);
}

function isOuterTree(treeRow, rowIndex, treeIndex, forest) {
    return rowIndex == 0 || rowIndex == forest.length - 1 || 
           treeIndex == 0 || treeIndex == treeRow.length - 1;
}

function parseForest(input) {
    return input.map(line => line.split('')
                     .flatMap(tree => parseInt(tree)));
}