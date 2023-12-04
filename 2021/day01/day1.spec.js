import { readLinesAsInts } from '../../common/readlines.js';
import day1 from './day1.js';

describe('day1', () => {

    it('runs', () => {
        expect(day1(readLinesAsInts('2021/day01/testdata.txt'), 1)).toEqual(7);
        expect(day1(readLinesAsInts('2021/day01/testdata.txt'), 3)).toEqual(5);
    });

});