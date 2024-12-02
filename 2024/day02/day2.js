export default function run(input, allows1Deletion) {
    return input.map(l => l.split(' ').map(l => parseInt(l)))
        .reduce((sum, report) => {
            if (isSafe(report)) return sum + 1;
            if (allows1Deletion)
                return sum + (report.some((_, i) => isSafe(report.filter((_, j) => j != i))) ? 1 : 0);
            return sum;
        }, 0);
}

function isSafe(r) {
    let direction = 0;

    return r.filter((l, i) => {
        if (i == 0) return false;
        let unsafe = direction < 0 && l > r[i - 1] ||
            direction > 0 && l < r[i - 1] ||
            l == r[i - 1] ||
            Math.abs(l - r[i - 1]) > 3;
        direction = l - r[i - 1];
        return !unsafe;
    }).length == r.length - 1;
}