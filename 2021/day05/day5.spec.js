import { readLines } from '../../common/readlines.js';
import run from './day5.js';

describe('day5', () => {

    it('runs', () => {
        let result = run(readLines('2021/day05/testdata.txt'));
        expect(result.part1).toEqual(5);
        expect(result.part2).toEqual(12);
    });

});