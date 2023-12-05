import { readLines } from '../../common/readlines.js';
import run from './day8.js';

describe('day8', () => {

    it('runs', () => {
        let result = run(readLines('2022/day08/testdata.txt'));
        expect(result.part1).toEqual(21);
        expect(result.part2).toEqual(8);
    });

});