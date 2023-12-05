import { readLines } from '../../common/readlines.js';
import run from './day4.js';

describe('day4', () => {

    it('runs', () => {
        let result = run(readLines('2023/day04/testdata.txt'));
        expect(result.part1).toEqual(22897);
        expect(result.part2).toEqual(5095824);
    });

});