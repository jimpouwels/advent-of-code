export default function run(lines, rowToCheck) {
    const sensors = parseSensorsAndBeacons(lines);
    const minX = Math.min(...sensors.flatMap(s => [s.position.x, s.closestBeacon.x]));
    const maxX = Math.max(...sensors.flatMap(s => [s.position.x, s.closestBeacon.x]));

    let part1 = 0;
    let count = 0;
    for (let x = minX; x <= maxX; x++) {
        count++;
        let canHaveBeacon = true;
        for (const sensor of sensors) {
            if (distanceBetween({ x: x, y: rowToCheck }, sensor.position) < 
                distanceBetween(sensor.position, sensor.closestBeacon)) {
                canHaveBeacon = false;
            }
        }
        if (!canHaveBeacon) {
            console.log(`Can't: ${x} and ${rowToCheck}`);
            part1++;
        }    
    }

    return {
        part1: part1,
        part2: 0
    };
}

function distanceBetween(point1, point2) {
    return Math.abs(point1.x - point2.x) + Math.abs(point2.y - point2.y);
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

    constructor(position, closestBeacon) {
        this.position = position;
        this.closestBeacon = closestBeacon;
    }
}