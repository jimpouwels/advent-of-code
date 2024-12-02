import { readLines } from '../../common/readlines.js';
import run from './day2.js';

describe('day2', () => {

    it('part1', () => {
        expect(run(readLines('2024/day02/testdata.txt'), false)).toEqual(516);
    });

    it('part2', () => {
        expect(run(readLines('2024/day02/testdata.txt'), true)).toEqual(561);
    });
});