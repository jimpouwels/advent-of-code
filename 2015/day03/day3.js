import { pushIfNotContains } from "../../common/arrays";

export default function day3(input, delivererCount) {
    let houses = [];
    let deliverers = Array(delivererCount).fill(null);
    deliverers.forEach((_, i) => deliverers[i] = new Deliverer());

    input.split('').forEach((c, i) => {
        let deliverer = deliverers[i % delivererCount];
        pushIfNotContains(houses, { x: deliverer.x, y: deliverer.y }, h => deliverer.isAt(h));
        deliverer.handleCommand(c);
    });
    return houses.length;
}

class Deliverer {
    x = 0;
    y = 0;

    handleCommand(command) {
        switch (command) {
            case ">":
                this.x++; break;
            case "<":
                this.x--; break;
            case "v":
                this.y++; break;
            case "^":
                this.y--; break;
        }
    }

    isAt(house) {
        return house.x == this.x && house.y == this.y;
    }
}
