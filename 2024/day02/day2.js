export default function run(input) {
    let reports = input.map(l => l.split(' ').map(l => parseInt(l)));

    let safeCount = reports.reduce((sum, r) => {
        let direction = 0;
        let safe = false;
        for (let l = 1; l < r.length; l++) {
            if ((direction < 0 && r[l] > r[l - 1]) || (direction > 0 && r[l] < r[l - 1]) || r[l] == r[l - 1] || Math.abs(r[l] - r[l - 1]) > 3) {
                safe = false;
                break;
            }
            direction = r[l] - r[l - 1];
            safe = true;
        }
        return safe ? sum + 1 : 0;
    }, 0);

    return {
        part1: safeCount
    }
}
