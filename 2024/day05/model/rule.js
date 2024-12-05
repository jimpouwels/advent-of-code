export default class Rule {
    before;
    after;

    constructor(before, after) {
        this.before = parseInt(before);
        this.after = parseInt(after);
    }

    meets(a, b, callback) {
        let inCorrect = this.before == b && this.after == a;
        callback(!inCorrect);
        return !inCorrect;
    }
}