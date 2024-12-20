import Robot from "./model/robot";

export default function run(input) {
    let robots = input.map(l => parseRobot(l));
    [...Array(100)].forEach(_ => {
        robots.forEach(r => {
            r.move();
        });
    });
    let leftTop = 0;
    let rightTop = 0;
    let leftBottom = 0;
    let rightBottom = 0;
    robots.forEach(r => {
        if (r.x < 50 && r.y < 51)
            leftTop++;
        else if (r.x > 50 && r.y < 51)
            rightTop++;
        else if (r.x < 50 && r.y > 51)
            leftBottom++;
        else if (r.x > 50 && r.y > 51)
            rightBottom++;
    });
    return leftTop * rightTop * leftBottom * rightBottom;
}

function parseRobot(line) {
    const { pX, pY, vX, vY } = line.match(/p=(?<pX>-?(\d+)),(?<pY>-?(\d+)) v=(?<vX>-?(\d+)),(?<vY>-?(\d+))/).groups;
    return new Robot(parseInt(pX), parseInt(pY), parseInt(vX), parseInt(vY), 101, 103);
}