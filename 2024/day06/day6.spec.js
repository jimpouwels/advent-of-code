import { readLines } from '../../common/readlines.js';
import run from './day6.js';

describe('day6', () => {

    it('part1', () => {
        let result = run(readLines('2024/day06/testdata.txt'));
        expect(result.part1).toEqual(4977);
        expect(result.part2).toEqual(1729);
    });
});