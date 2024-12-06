import { readLines } from '../../common/readlines.js';
import { part1, part2 } from './day6.js';

describe('day6', () => {

    it('part1', () => {
        expect(part1(readLines('2024/day06/testdata.txt'))).toEqual(4977);
        expect(part2(readLines('2024/day06/testdata.txt'))).toEqual(1729); // takes ~15 seconds to run, uncomment to get answer
    });
});