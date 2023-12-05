import { readLines } from '../../common/readlines.js';
import run from './day3.js';

describe('day3', () => {

    it('runs', () => {
        let result = run(readLines('2022/day03/testdata.txt'));
        expect(result.part1).toEqual(7878);
        expect(result.part2).toEqual(2760);
    });

});