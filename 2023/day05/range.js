export default class Range {
    from;
    to;
    index;

    constructor(from, to, index) {
        this.from = from;
        this.to = to;
        this.index = index;
    }

    length() {
        return this.to - this.from;
    }
}