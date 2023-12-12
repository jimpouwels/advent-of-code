import { readLines } from '../../common/readlines.js';
import run from './day11.js';

describe('day11', () => {

    it('runs', () => {
        let result = run(readLines('2023/day11/testdata.txt'));
        expect(result.part1).toEqual(10033566);
    });

});