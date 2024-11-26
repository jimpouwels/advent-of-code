export default function day1(input) {
    let basementEntry = Number.MAX_VALUE;
    let destination = input.split('').reduce((sum, d, i) => {
        sum += (d === '(' ? 1 : -1);
        if (sum < 0 && basementEntry == Number.MAX_VALUE) basementEntry = i + 1;
        return sum;
    }, 0);
    return {
        part1: destination,
        part2: basementEntry
    }
}

