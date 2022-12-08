export default function day1(input, windowSize) {

    const increasedCount = input.filter((_x, i) => i < input.length - windowSize)
                                .filter((_x, i) => {
                                    const current = sumWindow(input, i, i + windowSize);
                                    const next = sumWindow(input, i + 1, i + windowSize + 1);
                                    return current < next;
                                }).length;

    return increasedCount;
}

function sumWindow(input, from, to) {
    return input.slice(from, to).reduce((sum, val) => sum + parseInt(val), 0)
}
