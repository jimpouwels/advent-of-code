export default class Range {
    from;
    to;
    index;

    constructor(from, to, index = -1) {
        this.from = from;
        this.to = to;
        this.index = index;
    }

    overlapsWith(otherRange) {
        return otherRange.from >= this.from && otherRange.from < this.to ||
               otherRange.to > this.from && otherRange.to <= this.to ||
               (otherRange.from < this.from && otherRange.to > this.to);
    }

    fits(value) {
        return value >= this.from && value <= this.to;
    }
}