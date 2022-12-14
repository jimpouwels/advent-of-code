export default class List {
    
    values = [];
    parent;
    isDistress;

    constructor(parent, isDistress = false) {
        this.parent = parent;
        this.isDistress = isDistress;
    }
    
    push(value) {
        this.values.push(value);
    }

    length() {
        return this.values.length;
    }

    toString() {
        let asString = '[';
        const inners = [];
        for (const value of this.values) {
            if (!isNaN(value)) {
                inners.push(value);
            } else {
                inners.push(value.toString());
            }
        }
        asString += inners.join(',');
        asString += ']';
        return asString;
    }
}