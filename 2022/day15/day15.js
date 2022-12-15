export default function run(lines, rowToCheck) {
    const sensors = parseSensorsAndBeacons(lines);
    const minX = Math.min(...sensors.flatMap(s => [s.position.x, s.closestBeacon.x, s.position.x - s.distanceToBeacon]));
    const maxX = Math.max(...sensors.flatMap(s => [s.position.x, s.closestBeacon.x, s.position.x + s.distanceToBeacon]));

    let part1 = 0;
    for (let x = minX; x <= maxX; x++) {
        part1 += sensors.find(sensor => sensor.distanceToClosestBeaconFor({ x: x, y: rowToCheck }) != 0 &&
                                        sensor.distanceToPositionFor({ x: x, y: rowToCheck }) <= sensor.distanceToBeacon) ? 1 : 0;
    }

    return {
        part1: part1,
        part2: 0
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