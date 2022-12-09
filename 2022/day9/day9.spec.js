import { readLines } from '../../common/readlines.js';
import run from './day9.js';

describe('day9', () => {

    it('part1', () => {
        expect(run(readLines('2022/day9/testdata.txt'), 1)).toEqual(13);
    });

    it('part2', () => {
        expect(run(readLines('2022/day9/testdata.txt'), 10)).toEqual(1);
    });

});