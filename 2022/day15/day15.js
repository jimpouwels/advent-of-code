export default function run(lines, rowToCheck) {
    const sensors = parseSensorsAndBeacons(lines);
    const minX = Math.min(...sensors.flatMap(s => [s.position.x - s.distanceToBeacon]));
    const maxX = Math.max(...sensors.flatMap(s => [s.position.x + s.distanceToBeacon]));
    const maxY = Math.max(...sensors.map(s => s.position.y));

    const intervals = [];

    for (let i = 0; i < sensors.length; i++) {
        for (let y = sensors[i].position.y - sensors[i].distanceToBeacon; y < sensors[i].position.y + sensors[i].distanceToBeacon; y++) {
            let diff = y - (sensors[i].position.y - sensors[i].distanceToBeacon);
            if (y == sensors[i].position.y) {
                diff = sensors[i].distanceToBeacon;
            }
            if (y >= sensors[i].position.y) {
                diff = sensors[i].distanceToBeacon - (y - sensors[i].position.y);
            }
            intervals.push({ y: y, left: sensors[i].position.x - diff, right: sensors[i].position.x + diff });
        }
    }
    let part1 = [];
    for (let x = minX; x <= maxX; x++) {
        if (intervals.find(i => i.y == rowToCheck && x >= i.left && x <= i.right)) {
            if (sensors.find(s => s.closestBeacon.y == rowToCheck && s.closestBeacon.x == x)) continue;
            part1.push({ x: x, y: rowToCheck });
        }
    }

    let part2;
    // const searchAreaMaxX = Math.max(...sensors.map(s => [s.position.x]));
    // const searchAreaMaxY = Math.max(...sensors.map(s => [s.position.y]));

    // for (let y = 0; y < searchAreaMaxX; y++) {
    //     const bla = new Set();
    //     intervals.forEach(interval => {
    //         if (interval.y != y) return;
    //         for (let i = interval.left; i <= interval.right; i++) {
    //             bla.add(i);
    //         }
    //     });
    // }

    return {
        part1: part1.length,
        // part2: (part2.x * 4000000) + part2.y
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