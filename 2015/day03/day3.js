import { pushIfNotContains } from "../../common/arrays";

export default function day3(input, delivererCount) {
    let houses = [];
    let deliverers = Array(delivererCount).fill(null);
    deliverers.forEach((_, i) => deliverers[i] = new Deliverer());

    let i = 0;
    input.split('').forEach(c => {
        let deliverer = deliverers[i++];
        pushIfNotContains(houses, { x: deliverer.x, y: deliverer.y }, h => h.x == deliverer.x && h.y == deliverer.y);
        deliverer.handleCommand(c);
        i %= delivererCount;
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