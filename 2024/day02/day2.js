import { removeAt } from "../../common/arrays";

export default function run(input, allows1Deletion) {
    let reports = input.map(l => l.split(' ').map(l => parseInt(l)));

    let safeCount = reports.reduce((sum, r) => {
        if (isSafe(r)) return sum + 1;
        if (allows1Deletion)
            return sum + (r.some((_, i) => isSafe(removeAt(r, i))) ? 1 : 0);
        return sum;
    }, 0);

    return safeCount;
}

function isSafe(r) {
    let direction = 0;
    let previous = r[0];

    return r.filter((l, i) => {
        if (i == 0) return false;
        let unsafe = direction < 0 && l > previous ||
            direction > 0 && l < previous ||
            l == previous ||
            Math.abs(l - previous) > 3;
        direction = l - previous;
        previous = l;
        return !unsafe;
    }).length == r.length - 1;
}