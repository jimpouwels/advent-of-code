export default function run(input, allows1Deletion) {
    let reports = input.map(l => l.split(' ').map(l => parseInt(l)));

    let safeCount = reports.reduce((sum, r) => {
        let safe = isSafe(r);
        if (!safe && allows1Deletion) {
            for (let i = 0; i < r.length; i++) {
                let copy = [...r];
                copy.splice(i, 1);
                safe = isSafe(copy);
                if (safe) {
                    break;
                }
            }
        }
        return sum + (safe ? 1 : 0);
    }, 0);

    return safeCount;
}

function isSafe(r) {
    let safe = true;
    let direction = 0;
    let previous = r[0];
    for (let l = 1; l < r.length; l++) {
        if ((direction < 0 && r[l] > previous) || (direction > 0 && r[l] < previous) || r[l] == previous || Math.abs(r[l] - previous) > 3) {
            safe = false;
            break;
        } else {
            direction = r[l] - previous;
            previous = r[l];
        }
    }
    return safe;
}
