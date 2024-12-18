export default class Button {
    xDelta;
    yDelta;
    tokenCost = 0;

    constructor(xDelta, yDelta, tokenCost) {
        this.xDelta = xDelta;
        this.yDelta = yDelta;
        this.tokenCost = tokenCost;
    }
}