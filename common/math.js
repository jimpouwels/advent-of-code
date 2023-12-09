// Math.max() could result in StackOverflow error on large arrays. Alternative implementation.
export function max(arr) {
    let len = arr.length;
    let max = -Infinity;
    while (len--) {
        max = arr[len] > max ? arr[len] : max;
    }
    return max;
}

export function leastCommonDiviser(a, b) {
    return a / greatestCommonDiviser(a, b) * b;
}

export function greatestCommonDiviser(a, b) {
    return b == 0 ? a : greatestCommonDiviser(b, a % b)
}   