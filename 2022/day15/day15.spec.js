import { readLines } from '../../common/readlines.js';
import run from './day15.js';

describe('day15', () => {

    it('run1-small', () => {
        const r = run(readLines('2022/day15/testdata-small.txt'), 10);
        expect(r.part1).toEqual(26);
        expect(r.part2).toEqual(56000011);
    });

    /* Takes 20 seconds to run, uncomment to execute test with big data set */
    // it('run1-big', () => {
    //     const r = run(readLines('2022/day15/testdata-big.txt'), 2000000);
    //     expect(r.part1).toEqual(5127797);
    //     expect(r.part2).toEqual(12518502636475);
    // });

});