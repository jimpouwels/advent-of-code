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
    for (let i = 0; i < intervalsToCheck.length; i++) {
        for (let x = intervalsToCheck[i].left; x <= intervalsToCheck[i].right; x++) {
            if (!sensors.find(s => s.closestBeacon.x == x && s.closestBeacon.y == rowToCheck)) {
                positions.add(x);
            }
        }
    }
    return  positions;
}

function findPositionThatCanHaveABeacon(intervalsPerRow, maxY) {
    for (let y = 0; y <= maxY; y++) {
        const row = intervalsPerRow[y];
        let maxRight = row[0].right;
        for (let i = 1; i < row.length; i++) {
            const interval = row[i];
            if (interval.left > maxRight) {
                return { x: interval.left - 1, y: y };
            }
            maxRight = Math.max(interval.right, maxRight);
        }
    }
}

function initializeIntervals(maxY, sensors) {
    const intervals = new Array(maxY);

    sensors.forEach(sensor => {
        for (let y = sensor.position.y - sensor.distanceToBeacon; y < sensor.position.y + sensor.distanceToBeacon; y++) {
            let diff = y - (sensor.position.y - sensor.distanceToBeacon);
            if (y == sensor.position.y) {
                diff = sensor.distanceToBeacon;
            } else if (y >= sensor.position.y) {
                diff = sensor.distanceToBeacon - (y - sensor.position.y);
            }
            if (!intervals[y]) {
                intervals[y] = [];
            }
            intervals[y].push({ left: sensor.position.x - diff, right: sensor.position.x + diff });
        }
    });
    intervals.forEach(i => i.sort((a, b) => a.left - b.left));
    return intervals;
}

function parseSensorsAndBeacons(lines) {
    return lines.map(line => {
        const { x1, y1, x2, y2 } = line.match(/Sensor at x=(?<x1>(-?\d+)), y=(?<y1>(-?\d+)): closest beacon is at x=(?<x2>(-?\d+)), y=(?<y2>(-?\d+))/).groups;
        return new Sensor({ x: +x1, y: +y1 },
                          { x: +x2, y: +y2 })
    });
}

class Sensor {
    position;
    closestBeacon;
    distanceToBeacon;

    constructor(position, closestBeacon) {
        this.position = position;
        this.closestBeacon = closestBeacon;
        this.distanceToBeacon = this.getDistance(position, closestBeacon);
    }

    distanceToPositionFor(point) {
        return this.getDistance(point, this.position);
    }

    distanceToClosestBeaconFor(point) {
        return this.getDistance(point, this.closestBeacon);
    }

    getDistance(point1, point2) {
        return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y)
    }

}