export default function day3(input, delivererCount) {
    let houses = Array(1).fill({ x: 0, y: 0 });
    let deliverers = Array(delivererCount).fill(null);
    deliverers.forEach((_, i) => deliverers[i] = new Deliverer());

    let currentDeliverer = 0;
    input.split('').forEach(c => {
        let deliverer = deliverers[currentDeliverer];
        deliverer.handleCommand(c);
        let house = houses.filter(h => h.x == deliverer.x && h.y == deliverer.y)[0];
        if (!house)
            houses.push({ x: deliverer.x, y: deliverer.y });

        currentDeliverer = ++currentDeliverer == delivererCount ? 0 : currentDeliverer;
    });
    return houses.length;
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