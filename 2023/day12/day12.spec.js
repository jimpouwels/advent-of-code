import { readLines } from '../../common/readlines.js';
import run from './day12.js';

describe('day11', () => {

    it('runs', () => {
        let result = run(readLines('2023/day12/testdata.txt'));
        expect(result.part1).toEqual(21);
        expect(result.part2).toEqual(525152);
    });

});