import { readLines } from '../../common/readlines.js';
import run from './day4.js';

describe('day4', () => {

    it('runs', () => {
        let result = run(readLines('2022/day04/testdata.txt'));
        expect(result.part1).toEqual(526);
        expect(result.part2).toEqual(886);
    });

});