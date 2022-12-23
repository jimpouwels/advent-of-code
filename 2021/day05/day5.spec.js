import { readLines } from '../../common/readlines.js';
import run from './day5.js';

describe('day5', () => {

    it('part1', () => {
        expect(run(readLines('2021/day5/testdata.txt')).part1).toEqual(5);
        expect(run(readLines('2021/day5/testdata.txt')).part2).toEqual(12);
    });

});