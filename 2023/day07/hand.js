export default class Hand {
    cards;
    values = Array(15).fill(0);
    bet = 0;
    score = 0;
    handleJokers = false;

    constructor(cards, bet, handleJokers = false) {
        cards.forEach((c) => this.values[c]++)
        this.cards = cards;
        this.bet = bet;
        this.handleJokers = handleJokers;
        if (this.handleJokers) {
            this.jokerCount = this.values[1];
        }
    }

    calculateScore() {
        if (this.hasPairOf(5, 1))
            this.score = 7;
        else if (this.hasPairOf(4, 1))
            this.score = 6;
        else if (this.hasFullHouse())
            this.score = 5;
        else if (this.hasPairOf(3, 1))
            this.score = 4;
        else if (this.hasPairOf(2, 2))
            this.score = 3;
        else if (this.hasPairOf(2, 1))
            this.score = 2;
        else
            this.score = 1;
    }

    hasPairOf(length, count) {
        let remainingJokers = this.handleJokers ? this.jokerCount : 0;
        return this.values.filter((value, i) => {
            if (i == 1) return;
            let hasPair = value == length - remainingJokers;
            remainingJokers = Math.max(0, hasPair ? --remainingJokers : remainingJokers);
            return hasPair;
        }).length >= count;
    }

    hasFullHouse() {
        return (this.values.filter(v => v == 3).length == 1 &&
                this.values.filter(v => v == 2).length == 1) ||
                (this.handleJokers && this.values.filter(v => v == 2).length == 2 && this.jokerCount == 1);
    }

}