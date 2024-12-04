import { readLines } from '../../common/readlines.js';
import { part1, part2 } from './day4.js';

describe('day4', () => {

    it('part1', () => {
        expect(part1(readLines('2024/day04/testdata.txt'))).toEqual(2554);
    });

    it('part2', () => {
        expect(part2(readLines('2024/day04/testdata.txt'))).toEqual(1916);
    });
});