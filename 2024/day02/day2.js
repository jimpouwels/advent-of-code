export default function run(input, allows1Deletion) {
    return input.map(l => l.split(' ').map(l => parseInt(l)))
        .reduce((sum, report) => {
            if (isSafe(report)) return sum + 1;
            if (allows1Deletion)
                return sum + (report.some((_, i) => isSafe(report.filter((_, j) => j != i))) ? 1 : 0);
            return sum;
        }, 0);
}

function isSafe(report) {
    return report.every((l, i) =>
        i == 0 ||
        !(report[i - 1] - report[i - 2] < 0 && l > report[i - 1]
            || report[i - 1] - report[i - 2] > 0 && l < report[i - 1]
            || l == report[i - 1]
            || Math.abs(l - report[i - 1]) > 3)
    );
}