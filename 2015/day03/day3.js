import { pushIfNotContains } from "../../common/arrays";

export default function day3(input, delivererCount) {
    let houses = [];
    let deliverers = Array(delivererCount).fill(null);
    deliverers.forEach((_, i) => deliverers[i] = new Deliverer());

    input.split('').forEach((c, i) => {
        let deliverer = deliverers[i % delivererCount];
        pushIfNotContains(houses, { x: deliverer.x, y: deliverer.y }, h => h.x == deliverer.x && h.y == deliverer.y);
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