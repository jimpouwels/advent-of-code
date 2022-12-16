import Sensor from './sensor.js';

export default function run(lines, rowToCheck) {
    const sensors = parseSensorsAndBeacons(lines);
    const maxY = Math.max(...sensors.map(s => s.position.y));
    const intervalsPerRow = initializeIntervals(maxY, sensors);
    
    let part2 = findPositionThatCanHaveABeacon(intervalsPerRow, maxY);

    return {
        part1: findPositionsThatCantHaveBeacon(intervalsPerRow, rowToCheck, sensors).size,
        part2: (part2.x * 4000000) + part2.y
    };
}

function findPositionsThatCantHaveBeacon(intervalsPerRow, rowToCheck, sensors) {
    const positions = new Set()
    const intervalsToCheck = intervalsPerRow[rowToCheck];
    intervalsToCheck.forEach(intervalToCheck => {
        for (let x = intervalToCheck.from; x <= intervalToCheck.to; x++) {
            if (!sensors.find(s => s.closestBeacon.x == x && s.closestBeacon.y == rowToCheck)) {
                positions.add(x);
            }
        }
    });
    return  positions;
}

function findPositionThatCanHaveABeacon(intervalsPerRow, maxY) {
    for (let y = 0; y <= maxY; y++) {
        const row = intervalsPerRow[y];
        let maxTo = row[0].to;
        for (let i = 1; i < row.length; i++) {
            const interval = row[i];
            if (interval.from > maxTo) {
                return { x: interval.from - 1, y: y };
            }
            maxTo = Math.max(interval.to, maxTo);
        }
    }
}

function initializeIntervals(maxY, sensors) {
    const intervals = new Array(maxY);
    sensors.forEach(sensor => {
        for (let y = sensor.position.y - sensor.distanceToBeacon; y < sensor.position.y + sensor.distanceToBeacon; y++) {
            let remainingX = y - (sensor.position.y - sensor.distanceToBeacon);
            if (y == sensor.position.y) {
                remainingX = sensor.distanceToBeacon;
            } else if (y >= sensor.position.y) {
                remainingX = sensor.distanceToBeacon - (y - sensor.position.y);
            }
            if (!intervals[y]) {
                intervals[y] = [];
            }
            intervals[y].push({ from: sensor.position.x - remainingX, to: sensor.position.x + remainingX });
        }
    });
    intervals.forEach(i => i.sort((a, b) => a.from - b.from));
    return intervals;
}

function parseSensorsAndBeacons(lines) {
    return lines.map(line => {
        const { x1, y1, x2, y2 } = line.match(/Sensor at x=(?<x1>(-?\d+)), y=(?<y1>(-?\d+)): closest beacon is at x=(?<x2>(-?\d+)), y=(?<y2>(-?\d+))/).groups;
        return new Sensor({ x: +x1, y: +y1 },
                          { x: +x2, y: +y2 })
    });
}