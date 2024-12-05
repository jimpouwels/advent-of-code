export default class Rule {
    before;
    after;

    constructor(before, after) {
        this.before = parseInt(before);
        this.after = parseInt(after);
    }

    meets(a, b) {
        if (this.before == a && this.after == b) {
            return true;
        }
        if (this.before == b && this.after == a) {
            return false;
        }
        if (this.before != a && this.after != b) {
            return true;
        }
        return true;
    }
}