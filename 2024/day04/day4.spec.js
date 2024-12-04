import { readLines } from '../../common/readlines.js';
import run from './day4.js';

describe('day4', () => {

    it('run', () => {
        let result = run(readLines('2024/day04/testdata.txt'));
        expect(result.part1).toEqual(2554);
        expect(result.part2).toEqual(1916);
    });

});