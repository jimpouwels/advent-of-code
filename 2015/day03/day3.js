export default function day3(input, delivererCount) {
    let houses = Array(1).fill(new House(0, 0));
    let deliverers = Array(delivererCount).fill(null);
    deliverers.forEach((_, i) => deliverers[i] = new Deliverer());

    let currentDeliverer = 0;
    input.split('').forEach(c => {
        let deliverer = deliverers[currentDeliverer];
        deliverer.handleCommand(c);
        let house = houses.filter((h) => h.isAtPos(deliverer))[0];
        if (house)
            house.presents++
        else
            houses.push(new House(deliverer.x, deliverer.y));

        currentDeliverer = ++currentDeliverer == delivererCount ? 0 : currentDeliverer;
    });
    return houses.filter((h) => h.presents > 0).length;
}

class Deliverer {
    x = 0;
    y = 0;

    handleCommand(command) {
        if (command === '>') this.x++;
        if (command === '<') this.x--;
        if (command === 'v') this.y++;
        if (command === '^') this.y--;
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

    isAtPos(deliverer) {
        return this.x == deliverer.x && this.y == deliverer.y;
    }
}