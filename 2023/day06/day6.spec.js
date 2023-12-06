import { readLines } from '../../common/readlines.js';
import run from './day6.js';

describe('day6', () => {

    it('runs', () => {
        let result = run(readLines('2023/day06/testdata.txt'));
        expect(result.part1).toEqual(219849);
    });

});