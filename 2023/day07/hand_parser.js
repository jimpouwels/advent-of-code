import Hand from "./hand.js";
import { cardValues } from "./card_values.js";

export default class HandParser {
    static parseHands(lines, includeJokers) {
        cardValues['J'] = includeJokers ? 1 : 11;
        return lines.map(l => {
            const { handString, betString } = l.match(/(?<handString>.*) (?<betString>\d+)/).groups;
            let hand = new Hand(handString.split('').map(c => HandParser.parseCard(c)), parseInt(betString), includeJokers);
            hand.calculateScore();
            return hand;
        });
    }
    
    static parseCard(cardString) {
        return !isNaN(cardString) ? parseInt(cardString) : cardValues[cardString];
    }
}