import { readLines } from '../../common/readlines.js';
import run from './day6.js';

describe('day6', () => {

    it('part1', () => {
        expect(run(readLines('2024/day06/testdata.txt'))).toEqual(4977);
    });
});