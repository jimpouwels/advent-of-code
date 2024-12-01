import { readLines } from '../../common/readlines.js';
import run from './day1.js';

describe('day1', () => {

    it('run1', () => {
        let result = run(readLines('2024/day01/testdata.txt'));
        expect(result.part1).toEqual(2904518);
        expect(result.part2).toEqual(18650129);
    });
});