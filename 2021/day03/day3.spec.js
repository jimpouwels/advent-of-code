import { readLines } from '../../common/readlines.js';
import run from './day3.js';

describe('day3', () => {

    it('runs', () => {
        let result = run(readLines('2021/day03/testdata.txt'));
        expect(result.part1).toEqual(198);
        expect(result.part2).toEqual(230);
    });

});