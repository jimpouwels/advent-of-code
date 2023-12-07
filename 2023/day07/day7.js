import HandParser from "./hand_parser.js";

export default function run(lines, includeJokers = false) {
    let hands = HandParser.parseHands(lines, includeJokers)
                            .sort((h1, h2) => {    
                                if (h1.score != h2.score) {
                                    return h1.score > h2.score ? 1 : -1;
                                } else {
                                    for (let i = 0; i < h1.cards.length; i++) {
                                        if (h1.cards[i] == h2.cards[i]) {
                                            continue;
                                        }
                                        return h1.cards[i] > h2.cards[i] ? 1 : -1;
                                    }
                                }
                            });
    return hands.reduce((sum, hand, i) => sum + (hand.bet * (i + 1)), 0);    
}