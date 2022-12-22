export default class Step {
    valve;
    travelTime;
    route;

    constructor(valve, route) {
        this.valve = valve;
        this.route = route;
        this.travelTime = route.length;
    }

    do() {
        if (!this.valve.isOpen && this.valve.rate !== 0) {
            this.valve.open();
        } else {
            this.travelTime--;
        }
    }
}