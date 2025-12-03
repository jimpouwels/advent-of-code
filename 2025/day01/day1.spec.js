import { readLines } from '../../common/readlines.js';
import run from './day1.js';

describe('day1', () => {

    it('run1', () => {
        let result = run(readLines('2025/day01/testdata.txt'));
        expect(result.part1).toEqual(1172);
        expect(result.part2).toEqual(6932);
    });
});