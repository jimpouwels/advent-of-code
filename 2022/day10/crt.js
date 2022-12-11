export default class Crt {
    output = '';
    x = 0;
    xRegister;

    constructor(xRegister) {
        this.xRegister = xRegister;
    }

    tick() {
        this.output += this.isXWithinSprite() ? "#" : ".";
        if (this.x == 39) {
            this.output += "\n";
            this.x = -1;
        }
        this.x++;
    }


    isXWithinSprite() {
        return this.x >= this.xRegister.value - 1 && this.x <= this.xRegister.value + 1;
    }
}