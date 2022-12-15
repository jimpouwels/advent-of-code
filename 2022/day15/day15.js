export default function run(lines, rowToCheck) {
    const sensors = parseSensorsAndBeacons(lines);
    const minX = Math.min(...sensors.flatMap(s => [s.position.x, s.closestBeacon.x, s.position.x - s.distanceToBeacon]));
    const maxX = Math.max(...sensors.flatMap(s => [s.position.x, s.closestBeacon.x, s.position.x + s.distanceToBeacon]));

    let part1 = 0;
    for (let x = minX; x <= maxX; x++) {
        part1 += sensors.find(sensor => sensor.distanceToClosestBeaconFor({ x: x, y: rowToCheck }) != 0 &&
                                        sensor.coversPoint({x: x, y: rowToCheck})) ? 1 : 0;
    }

    const searchAreaMaxX = Math.max(...sensors.map(s => [s.position.x]));
    const searchAreaMaxY = Math.max(...sensors.map(s => [s.position.y]));

    let part2;
    top: for (let x = 0; x <= searchAreaMaxX; x++) {
        for (let y = 0; y <= searchAreaMaxY; y++) {
            if (sensors.filter(sensor => sensor.distanceToClosestBeaconFor({ x: x, y: y }) != 0 &&
                                         sensor.distanceToPositionFor({ x: x, y: y }) > sensor.distanceToBeacon).length == sensors.length) {
                console.log('tatata');
                part2 = (4000000 * x) + y;
                break top;
            }
        }
    }

    return {
        part1: part1,
        part2: part2
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
    coverage = [];

    constructor(position, closestBeacon) {
        this.position = position;
        this.closestBeacon = closestBeacon;
        this.distanceToBeacon = this.getDistance(position, closestBeacon);

        for (let x = position.x - this.distanceToBeacon; x <= position.x + this.distanceToBeacon; x++) {
            for (let y = position.y - this.distanceToBeacon; y <= position.y + this.distanceToBeacon; y++) {
                if (this.distanceToPositionFor({x: x, y: y}) <= this.distanceToBeacon) {
                    this.coverage.push({x:x, y:y});
                }
            }   
        }
    }

    coversPoint(point) {
        return this.coverage.find(c => c.x == point.x && c.y == point.y);
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