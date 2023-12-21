export default class Pattern {
    numbers;
    stringValue;
    length;

    constructor(numbers) {
        this.numbers = numbers;
        this.length = numbers.length;
        this.stringValue = numbers.join(',');
    }
}