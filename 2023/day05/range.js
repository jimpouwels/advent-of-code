export default class Range {
    from;
    to;
    index;

    constructor(from, to, index = -1) {
        this.from = from;
        this.to = to;
        this.index = index;
    }
}