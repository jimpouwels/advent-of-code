import { readLines } from '../../common/readlines.js';
import run from './day5.js';

describe('day4', () => {

    it('runs', () => {
        let result = run(readLines('2023/day05/testdata.txt'));
        expect(result.part1).toEqual(214922730);
        expect(result.part2).toEqual(0);
    });

});