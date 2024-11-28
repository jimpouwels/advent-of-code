export default function day1(input) {
    let basementEntry = -1;
    let destination = input.split('').reduce((currentFloor, direction, i) => {
        currentFloor += direction === '(' ? 1 : -1;
        if (currentFloor < 0 && basementEntry == -1) basementEntry = i + 1;
        return currentFloor;
    }, 0);
    return {
        part1: destination,
        part2: basementEntry
    }
}

