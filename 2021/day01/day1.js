export default function day1(depths, windowSize) {
    return depths.filter((_x, i) => i < depths.length - windowSize)
                .filter((_x, i) => sumWindow(depths, i, i + windowSize) < sumWindow(depths, i + 1, i + windowSize + 1))
                .length;
}

function sumWindow(depths, from, to) {
    return depths.slice(from, to).reduce((sum, val) => sum + val, 0)
}
