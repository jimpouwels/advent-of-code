export default class Display {
    mapping = [];
    input = [];
    output = [];

    constructor(input, output) {
        this.input = input;
        this.output = output;
    }

    isContainedBy(decimal, otherInput) {
        return this.mapping.find(c => decimal === c.decimal && c.isContainedBy(otherInput));
    }

    isNotContainedBy(decimal, otherInput) {
        return this.mapping.find(c => decimal === c.decimal && !c.isContainedBy(otherInput));
    }

    contains(decimal, otherInput) {
        return this.mapping.find(c => decimal === c.decimal && c.contains(otherInput));
    }

    doesNotMatch(decimal, otherInput) {
        return this.mapping.find(c => decimal === c.decimal && !c.matches(otherInput));
    }
}