import { readLinesAsInts } from '../../common/readlines.js';
import day1 from './day1.js';

describe('day1', () => {

    it('part1', () => {
        expect(day1(readLinesAsInts('2021/day1/testdata.txt'), 1)).toEqual(7);
    });

    it('part2', () => {
        expect(day1(readLinesAsInts('2021/day1/testdata.txt'), 3)).toEqual(5);
    });

});