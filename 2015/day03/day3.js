export default function day3(input) {
    let commands = input.split('');
    let houses = [];

    let posX = 0, posY = 0;
    houses.push(new House(0, 0));
    commands.forEach(c => {
        if (c === '>') posX++;
        if (c === '<') posX--;
        if (c === 'v') posY++;
        if (c === '^') posY--;
        let house = houses.filter((h) => h.x == posX && h.y == posY)[0];
        if (house) house.presents++
        else houses.push(new House(posX, posY));
    });
    return {
        part1: houses.filter((h) => h.presents > 0).length,
        part2: 0
    }
}

class House {
    x = 0;
    y = 0;
    presents = 1;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}