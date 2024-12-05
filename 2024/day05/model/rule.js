export default class Rule {
    before;
    after;

    constructor(before, after) {
        this.before = parseInt(before);
        this.after = parseInt(after);
    }

    meets(a, b, onIncorrect) {
        let inCorrect = this.before == b && this.after == a;
        if (inCorrect) {
            onIncorrect();
        }
        return !inCorrect;
    }
}