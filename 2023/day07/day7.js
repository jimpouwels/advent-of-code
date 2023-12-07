const cardValues = { T: 10, J: 11, Q: 12, K: 13, A: 14 };

export default function run(lines) {
    let hands = parseHands(lines);
    hands.forEach(h => h.calculateScore());
    hands = hands.sort((h1, h2) => h1.score > h2.score ? 1 : -1);
    let part1 = hands.sort((h1, h2) => {    
                                    if (h1.score == h2.score) {
                                        for (let i = 0; i < h1.cards.length; i++) {
                                            if (h1.cards[i] == h2.cards[i]) continue;
                                            return h1.cards[i] > h2.cards[i] ? 1 : -1;
                                        }
                                    }
                                    return 0;
                          })
                  .reduce((sum, hand, i) => sum + (hand.bet * (i + 1)), 0);    

    return {
        part1: part1,
        part2: 0
    }
}

function parseHands(lines) {
    return lines.map(l => {
        const { handString, betString } = l.match(/(?<handString>.*) (?<betString>\d+)/).groups;
        return new Hand(handString.split('').map(c => parseCard(c)), parseInt(betString));
    });
}

function parseCard(cardString) {
    return !isNaN(cardString) ? parseInt(cardString) : cardValues[cardString];
}

class Hand {
    cards;
    valueMap;
    bet = 0;
    score = 0;

    constructor(cards, bet) {
        this.valueMap = Array(14).fill(0);
        cards.forEach(c => this.valueMap[c - 1]++)
        this.cards = cards;
        this.bet = bet;
    }

    calculateScore() {
        if (this.hasPairOf(5))
            this.score = 7;
        else if (this.hasPairOf(4))
            this.score = 6;
        else if (this.hasFullHouse())
            this.score = 5;
        else if (this.hasPairOf(3))
            this.score = 4;
        else if (this.hasPairOf(2, 2))
            this.score = 3;
        else if (this.hasPairOf(2))
            this.score = 2;
        else
            this.score = 1;
    }

    hasPairOf(length, count = 1) {
        return Object.keys(this.valueMap).filter(k => this.valueMap[k] == length).length >= count;
    }

    hasFullHouse() {
        let pairOfThree = Object.keys(this.valueMap).filter(k => this.valueMap[k] == 3).map(k => k)[0];
        if (!pairOfThree) {
            return false;
        }
        return Object.keys(this.valueMap).filter(k => k != pairOfThree).filter(k => this.valueMap[k] == 2).length == 1;
    }
}