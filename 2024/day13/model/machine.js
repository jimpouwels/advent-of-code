export default class Machine {
    buttonA;
    buttonB;
    prize;
    currentPosition = { x: 0, y: 0 };

    constructor(buttonA, buttonB, prize) {
        this.buttonA = buttonA;
        this.buttonB = buttonB;
        this.prize = prize;
    }

    pressA() {
        this.currentPosition.x += this.buttonA.xDelta;
        this.currentPosition.y += this.buttonA.yDelta;
    }

    pressB() {
        this.currentPosition.x += this.buttonB.xDelta;
        this.currentPosition.y += this.buttonB.yDelta;
    }

    getPosition() {
        return this.currentPosition;
    }

    isPassedPrize() {
        return this.currentPosition.x > this.prize.x || this.currentPosition.y > this.prize.y;
    }

    distanceToPrize() {
        return { x: this.prize.x - this.currentPosition.x, y: this.prize.y - this.currentPosition.y };
    }

    isAtPrize() {
        return this.currentPosition.x == this.prize.x && this.currentPosition.y == this.prize.y;
    }
}