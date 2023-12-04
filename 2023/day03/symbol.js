export default class Symbol {
    x;
    y;
    value;

    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
    }

    getX() {
        return this.x;
    }

    getY() { 
        return this.y;
    }
    
    getValue() {
        return this.value;
    }
}
