import { readLines } from '../../common/readlines.js';
import run from './day4.js';

describe('day4', () => {

    it('part1', () => {
        expect(run(readLines('2024/day04/testdata.txt'))).toEqual(18);
    });
});