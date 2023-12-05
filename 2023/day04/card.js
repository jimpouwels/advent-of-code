export default class Card {
    index;
    numbers = [];
    winningNumbers = [];
    matchCount = 0;

    constructor(index, numbers, winningNumbers) {
        this.index = index;
        this.numbers = numbers;
        this.winningNumbers = winningNumbers;
    }
}