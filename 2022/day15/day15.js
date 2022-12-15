export default function run(lines, rowToCheck) {
    const sensors = parseSensorsAndBeacons(lines);
    const minX = Math.min(...sensors.flatMap(s => [s.position.x - s.distanceToBeacon]));
    const maxX = Math.max(...sensors.flatMap(s => [s.position.x + s.distanceToBeacon]));

    const intervals = [];
    for (let y = 0; y < 20; y++) {
        for (let i = 0; i < sensors.length; i++) {
            if (Math.abs(sensors[i].position.y - y) > sensors[i].distanceToBeacon) continue;
            intervals.push({ y: y, left: sensors[i].position.x - (sensors[i].distanceToBeacon - Math.abs(sensors[i].position.y - y))
                            ,right:sensors[i].position.x + (sensors[i].distanceToBeacon - Math.abs(sensors[i].position.y - y))
                            });
        }
    }

    let part1 = 0;
    for (let x = minX; x <= maxX; x++) {
        part1 += intervals.find(i => x >= i.left && x <= i.right && i.y == rowToCheck) && !sensors.find(s => s.closestBeacon.x == x && s.closestBeacon.y == rowToCheck) ? 1 : 0;
    }

    let part2;
    const searchAreaMaxX = Math.max(...sensors.map(s => [s.position.x]));
    const searchAreaMaxY = Math.max(...sensors.map(s => [s.position.y]));

    top: for (let x = 0; x < searchAreaMaxX; x++) {
        for (let y = 0; y < searchAreaMaxY; y++) {
            if (!intervals.find(i => x >= i.left && x <= i.right && i.y == y)) {
                part2 = { x: x, y: y };
                break top;
            }
        }
    }

    return {
        part1: part1,
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