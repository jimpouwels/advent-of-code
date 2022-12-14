export default class List {
    
    values = [];
    parent;

    constructor(parent) {
        this.parent = parent;
    }
    
    push(value) {
        this.values.push(value);
    }

    length() {
        return this.values.length;
    }
}