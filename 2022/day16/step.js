export default class Step {
    rate;
    travelTime;

    constructor(rate, travelTime = 0) {
        this.rate = rate;
        this.travelTime = travelTime;
    }
}