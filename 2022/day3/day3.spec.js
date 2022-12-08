import { readLines } from '../../common/readlines.js';
import day3 from './day3.js';

describe('day3', () => {

    it('part1', () => {
        const result = day3(readLines('2022/day3/testdata.txt'));
        expect(result.part1).toEqual(7878);
    });

    it('part2', () => {
        const result = day3(readLines('2022/day3/testdata.txt'));
        expect(result.part2).toEqual(2760);
    });

});