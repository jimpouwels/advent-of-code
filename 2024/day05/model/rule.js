export default class Rule {
    before;
    after;

    constructor(before, after) {
        this.before = parseInt(before);
        this.after = parseInt(after);
    }

    meets(a, b) {
        return !(this.before == b && this.after == a);
    }
}