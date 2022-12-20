// Math.max() could result in StackOverflow error on large arrays. Alternative implementation.
export function max(arr) {
    let len = arr.length;
    let max = -Infinity;
    while (len--) {
        max = arr[len] > max ? arr[len] : max;
    }
    return max;
}