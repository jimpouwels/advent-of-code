export default function day3(input, delivererCount) {
    let houses = [];
    let deliverers = Array(delivererCount).fill(null);
    deliverers.forEach((_, i) => deliverers[i] = new Deliverer());

    let i = 0;
    input.split('').forEach(c => {
        let deliverer = deliverers[i++];
        if (houses.filter(h => h.x == deliverer.x && h.y == deliverer.y).length == 0)
            houses.push({ x: deliverer.x, y: deliverer.y });

        i %= delivererCount;
        deliverer.handleCommand(c);
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