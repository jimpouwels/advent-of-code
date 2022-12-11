export default class Crt {
    output = '';
    x = 0;
    xRegister;

    constructor(xRegister) {
        this.xRegister = xRegister;
    }

    tick() {
        this.output += this.x >= this.xRegister.value -1 && this.x <= this.xRegister.value + 1 ? "#" : ".";
        this.x++;
        if (this.x == 40) {
            this.output += "\n";
            this.x = 0;
        }
    }
}