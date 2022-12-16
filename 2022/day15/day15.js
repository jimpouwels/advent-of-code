export default function run(lines, rowToCheck) {
    const sensors = parseSensorsAndBeacons(lines);
    const minX = Math.min(...sensors.flatMap(s => [s.position.x - s.distanceToBeacon]));
    const maxX = Math.max(...sensors.flatMap(s => [s.position.x + s.distanceToBeacon]));
    const maxY = Math.max(...sensors.map(s => s.position.y));

    const intervals = new Array(maxY);

    for (let i = 0; i < sensors.length; i++) {
        for (let y = sensors[i].position.y - sensors[i].distanceToBeacon; y < sensors[i].position.y + sensors[i].distanceToBeacon; y++) {
            let diff = y - (sensors[i].position.y - sensors[i].distanceToBeacon);
            if (y == sensors[i].position.y) {
                diff = sensors[i].distanceToBeacon;
            }
            if (y >= sensors[i].position.y) {
                diff = sensors[i].distanceToBeacon - (y - sensors[i].position.y);
            }
            if (!intervals[y]) intervals[y] = [];
            intervals[y].push({ left: sensors[i].position.x - diff, right: sensors[i].position.x + diff });
        }
    }
    let part1 = new Set();
    const intervalsToCheck = intervals[rowToCheck];
    intervalsToCheck.sort((a, b) => a.left - b.left);
    for (let i = 0; i < intervalsToCheck.length; i++) {
        for (let x = intervalsToCheck[i].left; x <= intervalsToCheck[i].right; x++) {
            if (!sensors.find(s => s.closestBeacon.x == x && s.closestBeacon.y == rowToCheck)) {
                part1.add(x);
            }
        }
    }

    let part2 = null;
    top: for (let y = 0; y <= maxY; y++) {
        const currentInterval = intervals[y];
        currentInterval.sort((a, b) => a.left - b.left);
        let prev = null;
        let maxRight = 0;
        for (let i = 0; i < currentInterval.length; i++) {
            const c = currentInterval[i];
            
            if (i > 0) {
                if (c.left > maxRight) {
                    part2 = { x: c.left - 1, y: y };
                    break top;
                }
            }
            prev = c;
            if (c.right > maxRight) {
                maxRight = prev.right;
            }
        }
    }

    return {
        part1: part1.size,
        part2: (part2.x * 4000000) + part2.y
    };
}

function parseSensorsAndBeacons(lines) {
    return lines.map(sensor => sensor.replace('Sensor at ', ''))
                .map(sensor => sensor.split(': closest beacon is at '))
                .map(sensor => {
                    const sensorSplit = sensor[0].split(', ');
                    const beaconSplit = sensor[1].split(', ');
                    return new Sensor({ x: parseInt(sensorSplit[0].split('=')[1]), y: parseInt(sensorSplit[1].split('=')[1]) },
                                      { x: parseInt(beaconSplit[0].split('=')[1]), y: parseInt(beaconSplit[1].split('=')[1]) })
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