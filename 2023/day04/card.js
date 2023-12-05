export default class Card {
    index;
    numbers = [];
    winningNumbers = [];
    matchingNumbers = [];
    scoreValue = 0;

    constructor(index, numbers, winningNumbers) {
        this.index = index;
        this.numbers = numbers;
        this.winningNumbers = winningNumbers;
    }

    score() {
        this.matchingNumbers = this.numbers.filter(n => this.winningNumbers.includes(n));
        this.scoreValue = this.matchingNumbers.reduce((sum) => sum === 0 ? 1 : sum * 2, 0);
    }

    getScore() {
        return this.scoreValue;
    }
}