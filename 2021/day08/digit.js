export default class Digit {
    requiredChars;
    decimal;

    constructor(requiredChars, decimal) {
        this.requiredChars = requiredChars;
        this.decimal = decimal;
    }

    matches(chars) {
        return this.contains(chars) && chars.length === this.requiredChars.length;
    }

    contains(chars) {
        return [...chars].filter(c => this.requiredChars.includes(c)).length === chars.length;
    }

    isContainedBy(chars) {
        return [...this.requiredChars].filter(c => chars.includes(c)).length === this.requiredChars.length;
    }
}
