export default function run(lines) {
    const part1 = 0;
    const sensors = parseSensorsAndBeacons(lines);
    console.log(sensors);
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
                    return new Sensor({ x: sensorSplit[0].split('=')[1], y: sensorSplit[1].split('=')[1] },
                                      { x: beaconSplit[0].split('=')[1], y: beaconSplit[1].split('=')[1] })
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