export default class Number {
    stringValue = "";
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    addDigit(digit) {
        this.stringValue += digit;
    }

    toInt() {
        return parseInt(this.stringValue);
    }

    length() {
        return this.stringValue.length;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    isAdjacentTo(symbol) {
        return symbol.getX() >= (this.getX() - 1) && 
               symbol.getX() <= (this.getX() + this.length()) &&
               Math.abs(this.getY() - symbol.getY()) <= 1;
    }

}