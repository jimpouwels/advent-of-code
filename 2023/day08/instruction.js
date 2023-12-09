export default class Instruction {
    name;
    next = [];

    constructor(name) {
        this.name = name;
    }
    
    setNext(left, right) {
        this.next.push(left);
        this.next.push(right);
    }

    isBegin() {
        return this.name.endsWith('A');
    }

    isEnd() {
        return this.name.endsWith('Z');
    }
}