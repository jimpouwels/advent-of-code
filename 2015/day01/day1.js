export default function day1(input) {
    return input.split('').reduce((sum, d) => sum + (d === '(' ? 1 : -1), 0);
}

