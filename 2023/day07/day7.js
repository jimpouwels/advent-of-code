import Hand from "./hand";

let cardValues = { "T": 10, "J": 11, "Q": 12, "K": 13, "A": 14 };

export default function run(lines, includeJokers = false) {
    cardValues['J'] = includeJokers ? 1 : 11;
    return parseHands(lines, includeJokers)
                    .sort((h1, h2) => sort(h1, h2))
                    .reduce((sum, hand, i) => sum + (hand.bet * (i + 1)), 0);    
}

function sort(hand1, hand2) {
    if (hand1.score != hand2.score) {
        return hand1.score > hand2.score ? 1 : -1;
    } else {
        for (let i = 0; i < hand1.cards.length; i++) {
            if (hand1.cards[i] == hand2.cards[i]) {
                continue;
            }
            return hand1.cards[i] > hand2.cards[i] ? 1 : -1;
        }
    }
}

function parseHands(lines, includeJokers) {
    return lines.map(l => {
        const { handString, betString } = l.match(/(?<handString>.*) (?<betString>\d+)/).groups;
        let hand = new Hand(handString.split('').map(c => parseCard(c)), parseInt(betString), includeJokers);
        hand.calculateScore();
        return hand;
    });
}

function parseCard(cardString) {
    return !isNaN(cardString) ? parseInt(cardString) : cardValues[cardString];
}