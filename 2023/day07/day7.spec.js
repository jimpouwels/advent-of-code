import { readLines } from '../../common/readlines.js';
import run from './day7.js';
import Hand from './hand.js';

describe('day7', () => {

    it('runs', () => {
        expect(run(readLines('2023/day07/testdata.txt'), false)).toEqual(249638405);
        expect(run(readLines('2023/day07/testdata.txt'), true)).toEqual(249776650);
    });

    it('hands', () => {
        assertHand([1, 1, 1, 1, 1], 7);
        assertHand([14, 14, 14, 14, 14], 7);
        assertHand([14, 14, 14, 14, 1], 7);
        assertHand([14, 14, 14, 1, 1], 7);
        assertHand([14, 14, 1, 1, 1], 7);
        assertHand([14, 1, 1, 1, 1], 7);

        assertHand([14, 14, 14, 14, 2], 6);
        assertHand([14, 2, 14, 14, 14], 6);
        assertHand([14, 14, 14, 1, 2], 6);
        assertHand([14, 14, 1, 1, 2], 6);
        assertHand([14, 1, 1, 1, 2], 6);

        assertHand([14, 14, 14, 13, 13], 5);
        assertHand([14, 14, 13, 13, 1], 5);
    });

    function assertHand(cards, score) {
        let hand = new Hand(cards, 1, true);
        hand.calculateScore();
        expect(hand.score).toEqual(score);
    }
});