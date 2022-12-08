export default function day8(input) {
    const forest = parseForest(input);
    
    let numberOfVisibleTrees = forest.flatMap((treeRow, rowIndex) => treeRow.filter((tree, treeIndex) => {
        return matchOuter(treeRow, rowIndex, treeIndex, forest) ||
            visibleFromLeft(treeRow, treeIndex, tree) ||
            visibleFromRight(treeRow, treeIndex, tree) ||
            visibleFromTop(forest, rowIndex, treeIndex, tree) ||
            visibleFromBottom(forest, rowIndex, treeIndex, tree);
    })).length; 

    return {
        part1: numberOfVisibleTrees
    };
}

function visibleFromBottom(forest, rowIndex, treeIndex, tree) {
    return Math.max(...getTreesBelow(forest, rowIndex, treeIndex)) < tree;
}

function visibleFromTop(forest, rowIndex, treeIndex, tree) {
    return Math.max(...getTreesAbove(forest, rowIndex, treeIndex)) < tree;
}

function visibleFromRight(treeRow, treeIndex, tree) {
    return Math.max(...treeRow.slice(treeIndex + 1, treeRow.length)) < tree;
}

function visibleFromLeft(treeRow, treeIndex, tree) {
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

function matchOuter(treeRow, rowIndex, treeIndex, forest) {
    return rowIndex == 0 || rowIndex == forest.length - 1 || 
           treeIndex == 0 || treeIndex == treeRow.length - 1;
}

function matchInner(treeRow, rowIndex, tree, treeIndex, forest) {
    return false;
}

function parseForest(input) {
    return input.map(line => line.split('')
                     .flatMap(tree => parseInt(tree)));
}