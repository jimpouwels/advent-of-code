export default class Crt {
    output = '';
    x = 0;
    xRegister;

    constructor(xRegister) {
        this.xRegister = xRegister;
    }

    tick(xRegister) {
        if (xRegister.value - 1 === this.x || xRegister.value === this.x || xRegister.value + 1 === this.x) {
            this.output += "#";
        } else {
            this.output += '.';
        }
        this.x++;
        if (this.x == 40) {
            this.output += "\n";
            this.x = 0;
        }
    }
}