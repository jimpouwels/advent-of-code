export default class Crt {
    static SCREEN_WIDTH = 40;
    output = '';
    x = 0;
    xRegister;

    constructor(xRegister) {
        this.xRegister = xRegister;
    }

    tick() {
        this.output += this.isXWithinSprite() ? "#" : ".";
        if (this.x == Crt.SCREEN_WIDTH - 1) {
            this.output += "\n";
            this.x = -1;
        }
        this.x++;
    }


    isXWithinSprite() {
        return this.x >= this.xRegister.value - 1 && this.x <= this.xRegister.value + 1;
    }
}