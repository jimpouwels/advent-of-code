export default function day3(input, delivererCount) {
    let commands = input.split('');
    let houses = Array(1).fill(new House(0, 0));
    let currentDeliverer = 0;
    let deliverers = Array(delivererCount).fill(null);
    deliverers.forEach((_, i) => deliverers[i] = new Deliverer());

    commands.forEach(c => {
        let deliverer = deliverers[currentDeliverer];
        deliverer.handleCommand(c);
        let house = houses.filter((h) => h.x == deliverer.posX && h.y == deliverer.posY)[0];
        if (house) house.presents++
        else houses.push(new House(deliverer.posX, deliverer.posY));
        currentDeliverer = ++currentDeliverer == delivererCount ? 0 : currentDeliverer;
    });
    return houses.filter((h) => h.presents > 0).length;
}

class Deliverer {
    posX = 0;
    posY = 0;

    handleCommand(command) {
        if (command === '>') this.posX++;
        if (command === '<') this.posX--;
        if (command === 'v') this.posY++;
        if (command === '^') this.posY--;
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