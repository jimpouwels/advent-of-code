import { readLines } from '../../common/readlines.js';
import run from './day3.js';

describe('day3', () => {

    it('runs', () => {
        expect(run(readLines('2022/day03/testdata.txt')).part1).toEqual(7878);
        expect(run(readLines('2022/day03/testdata.txt')).part2).toEqual(2760);
    });

});