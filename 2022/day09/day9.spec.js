import { readLines } from '../../common/readlines.js';
import run from './day9.js';

describe('day9', () => {

    it('part1', () => {
        expect(run(readLines('2022/day9/testdata_p1.txt'), 2)).toEqual(13);
    });

    it('part2', () => {
        expect(run(readLines('2022/day9/testdata_p2.txt'), 10)).toEqual(36);
    });

});